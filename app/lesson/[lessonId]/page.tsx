import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../quiz";

interface Props {
  params: Promise<{ lessonId: string }>;
}

const LessonIdPage = async ({ params }: Props) => {
  // Await the params Promise to extract the lessonId.
  const { lessonId } = await params;

  // Convert lessonId to number for your query if needed.
  const lessonData = getLesson(Number(lessonId));
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
