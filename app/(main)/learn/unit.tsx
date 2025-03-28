/* eslint-disable @typescript-eslint/no-unused-vars */
import { lessons, units } from "@/db/schema";
import {UnitBanner} from "./unit-banner";
import {LessonButton} from "./lesson-button";
interface Props{
    id: number,
    order: number,
    title: string,
    description: string,
    activeLessonPercentage: number,
    lessons: (typeof lessons.$inferSelect & {
        completed: boolean;
    })[],
    activeLesson: typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
    } |  undefined;
}


export const Unit = ({id, order, title, description, activeLessonPercentage, lessons, activeLesson}:Props)=>{
    return(
        <>
            <UnitBanner 
            title={title}
            description={description}
            />
            <div className="flex items-center flex-col relative pb-6">
                {lessons.map((lesson, index)=>{
                    const isCurrent =lesson.id === activeLesson?.id;
                    const isLocked = !lesson.completed && !isCurrent;

                    return(
                        <LessonButton 
                        key={lesson.id}
                        id={lesson.id}
                        index={index}
                        totalCount={lessons.length-1}
                        current={isCurrent}
                        locked={isLocked}
                        percentage={activeLessonPercentage}
                         />
                    );
                })}
            </div>
        </>
    )
}