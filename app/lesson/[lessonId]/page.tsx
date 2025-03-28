import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../quiz";

interface Props {
  params: {
    lessonId: string; // Changed from number to string
  }
}

const LessonIdPage = async ({ params }: Props) => {
  // Convert lessonId to number for your queries if needed.
  const lessonData = getLesson(Number(params.lessonId));
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <div className="min-h-screen flex flex-col">
      <Quiz
        initialLessonId={lesson.id}
        initialLessonChallanges={lesson.challenges}
        initialHearts={userProgress.hearts}
        initialPoints={userProgress.points}
        initialPercentage={initialPercentage}
        userSubscription={userSubscription}
      />
    </div>
  );
};

export default LessonIdPage;
