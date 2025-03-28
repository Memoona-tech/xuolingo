/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { useAudio, useWindowSize, useMount } from "react-use";
import Confetti from "react-confetti";

import { Challenge } from "./challenge";
import { Header } from "./header";
import { Footer } from "./footer";
import { QuestionBubble } from "./question-bubble";

import { challengeOptions, challenges, userSubscription } from "@/db/schema";
import React, { useState, useTransition } from "react";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast, Toaster } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { redirect, useRouter } from "next/navigation";
import { ResultCard } from "./result-card";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";


interface Props {
  initialPercentage: number;
  initialHearts: number;
  initialPoints: number;
  initialLessonId: number;
  initialLessonChallanges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription: typeof userSubscription.$inferSelect & {
    isActive: boolean;
  } | null;
}

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialPoints,
  initialLessonId,
  initialLessonChallanges,
  userSubscription,
}: Props) => {

  const { open: openPracticeModal } = usePracticeModal();
  const { open: openHeartsModal } = useHeartsModal();
  
useMount(() => {
  if(initialPercentage === 100){
    openPracticeModal();
  }
})

  const {width, height} = useWindowSize();
  const router = useRouter();
  const [finishAudio] = useAudio({src: "/finish.mp3", autoPlay: true});

  const [correctAudio, _c, correctControls] = useAudio({
     src: "/correct.wav" });
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: "/incorrect.wav",
  });

  const [pending, startTransition] = useTransition();
  const [selectedOption, setSelectedOption] = useState<number | undefined>(undefined);
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
  const [hearts, setHearts] = useState(initialHearts);

  const [percentage, setPercentage] = useState(()=>{
    return initialPercentage === 100 ? 0 : initialPercentage;
  });

  const [lessonId] = useState(initialLessonId);
  const [challenges] = useState(initialLessonChallanges);

  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );

    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];


  const onNext = () =>{
    setActiveIndex((current) => current + 1);
  }

  const onSelect = (id: number) => {
    if (status !== "none") {
      return;
    }
    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correct);

    if (!correctOption) return;

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            correctControls.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            // This is a practice
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."));
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              openHeartsModal();
              return;
            }

            incorrectControls.play();
            setStatus("wrong");

            if (!response?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again."));
      });
    }
  };


  if (!challenge) {
    return (

      <>
    {finishAudio}
      <Confetti 
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={500}
      tweenDuration={1000}
      />

      <div
        className="flex flex-col gap-y-4 lg:gap-y-8 
                max-w-lg mx-auto text-center 
                items-center justify-center 
                min-h-screen p-8"
      >
        <Image
          src="/finish.svg"
          width={200}
          height={200}
          alt="Finish"
          className="hidden lg:block"
        />
        <Image
          src="/finish.svg"
          width={100}
          height={100}
          alt="Finish"
          className="block lg:hidden"
        />

        <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
          Great job!
          <br /> You&apos;ve completed the lesson.
        </h1>

        <div className="flex flex-row items-center justify-center gap-3 mt-4">
          <ResultCard variant="points" value={challenges.length * 10} />
          <ResultCard variant="hearts" value={hearts} />
        </div>
      </div>
        <Footer 
        lessonId={lessonId} 
        status="completed" 
        onCheck={() => router.push("/learn")} />
      </>
    );
  }

  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;

  return (
    <>
      {incorrectAudio}
      {correctAudio}
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={userSubscription?.isActive ?? false}
      />

      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-2xl lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>

            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        lessonId={initialLessonId}
        status={status}
        disabled={pending || !selectedOption}
        onCheck={onContinue}
      />
    </>
  );
};
