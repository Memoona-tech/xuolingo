import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./quiz";

const LessonPage = async() =>{

    const userSubscriptoinData =  getUserSubscription();
    const lessonData = getLesson();
    const userProgressData = getUserProgress();

    const [
        lesson,
        userProgress,
        userSubscription,
    ] = await Promise.all([
        lessonData,
        userProgressData,
        userSubscriptoinData
    ]);

if(!lesson || !userProgress){
    redirect("/learn");
}

const initialPercentage = lesson.challenges
.filter((challenge)=> challenge.completed)
.length / lesson.challenges.length * 100;
    return (

        
        <div className="min-h-screen flex flex-col">
            <Quiz
            initialLessonId={lesson.id}
            initialLessonChallanges={lesson.challenges}
            initialHearts={userProgress.hearts}
            initialPoints={userProgress.points}
            initialPercentage={initialPercentage}
            userSubscription={userSubscription} />  
        </div>
    )
}
export default LessonPage;