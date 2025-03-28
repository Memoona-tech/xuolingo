import "dotenv/config";
import {drizzle } from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless";

import * as schema from "../db/schema";


const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {schema});

const main = async()=>{

    try{
        console.log("Seeding database");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.userSubscription);

        await db.insert(schema.courses).values([
            {   
                id: 1,
                title: "Spanish",
                imageSrc: "/es.svg",
            },
            {
                id: 2,
                title: "French",
                imageSrc: "/fr.svg",
            },
            {
                id: 3,
                title: "German",
                imageSrc: "/gr.webp",
            },
            {
                id: 4,
                title: "Urdu",
                imageSrc: "/pk.webp",
            },
            {
                id: 5,
                title: "Italian",
                imageSrc: "/it.svg",
            },
            {   
                id: 6,
                title: "Chinese",
                imageSrc: "/ch.jpg",
                
            },
            {   
                id: 7,
                title: "Croatian",
                imageSrc: "/hr.svg",
            },
            {   
                id: 8,
                title: "Hindi",
                imageSrc: "/in.svg",
            },{
                id: 9,
                title: "Japanese",
                imageSrc: "/jp.svg",
            },
            {
                id: 10,
                title: "Arabic",
                imageSrc: "/sa.png",
            },
            {
                id: 11,
                title: "Russian",
                imageSrc: "/ru.png",
            },
            {
                id: 12,
                title: "Turkish",
                imageSrc: "/tr.png",
            },

        ]);


        await db.insert(schema.units).values([
        {
            id:1,
            courseId: 1,
            title: "Unit 1",
            description: "Learn basics of Spanish",
            order: 1,
        },{
            id: 2,
            courseId: 1,
            title: "Unit 2",
            description: "Learn basics of French",
            order: 2,
        },{
            id: 3,
            courseId: 1,
            title: "Unit 3",
            description: "Learn nouns in Spanish",
            order: 3,
        },{
            id: 4,
            courseId: 1,
            title: "Unit 4",
            description: "Learn basics of Urdu",
            order: 4,
        },{
            id: 5,
            courseId: 1,
            title: "Unit 5",
            description: "Learn basics of Italian",
            order: 5,
        },{
            id: 6,
            courseId: 1,
            title: "Unit 6",
            description: "Learn basics of Chinese",
            order: 6,
        }
    ]);

 await db.insert(schema.lessons).values([
    {
    id: 1,
    unitId: 1,
    order: 1,
    title: "Nouns",
 },{
     id: 2,
        unitId: 1,
        order: 2,
        title: "Verbs",
 },{
        id: 3,
            unitId: 1,
            order: 3,
            title: "Adjectives",
    },{
        id: 4,
            unitId: 1,
            order: 4,
            title: "Pronouns",
    },{
        id: 5,
            unitId: 1,
            order: 5,
            title: "Prepositions",
    }
    
]);  


await db.insert(schema.challenges).values([{
    id:1,
    type: "SELECT",
    lessonId: 1,
    question: 'Which one of these is the "man"?',
    order: 1,
},{
    id:2,
    type: "ASSIST",
    lessonId: 1,
    question: '" the man"',
    order: 2,
},{
    id:3,
    type: "SELECT",
    lessonId: 1,
    question: 'Which one of these is the "the robot"?',
    order: 3,
},
]);

await db.insert(schema.challenges).values([
    {
      id: 4,
      lessonId: 2, // Verbs
      type: "SELECT",
      order: 1,
      question: 'Which one of these is the "the man"?',
    },
    {
      id: 5,
      lessonId: 2, // Verbs
      type: "ASSIST",
      order: 2,
      question: '"the man"',
    },
    {
      id: 6,
      lessonId: 2, // Verbs
      type: "SELECT",
      order: 3,
      question: 'Which one of these is the "the robot"?',
    },
  ]);

await db.insert(schema.challengeOptions).values([
{
    challengeId: 1,
    text: "el hombre",
    correct: true,
    imageSrc: "/man.png",
    audioSrc: "/es_man.mp3"

},{
    challengeId: 1,
    text: "la mujer",
    correct: false,
    imageSrc: "/woman.png",
    audioSrc: "/es_woman.mp3"

},{
    challengeId: 1,
    text: "el robot",
    correct: false,
    imageSrc: "/robot1.png",
    audioSrc: "/es_robot.mp3"
}
]);

await db.insert(schema.challengeOptions).values([
    {
        challengeId: 2,
        text: "el hombre",
        correct: true,
        audioSrc: "/es_man.mp3"
    
    },{
        challengeId: 2,
        text: "la mujer",
        correct: false,
        audioSrc: "/es_woman.mp3"
    
    },{
        challengeId: 2,
        text: "el robot",
        correct: false,
        audioSrc: "/es_robot.mp3"
    }
    ]);

    await db.insert(schema.challengeOptions).values([
        {
          challengeId: 3, // Which one of these is the "the robot"?
          imageSrc: "/man.png",
          correct: false,
          text: "el hombre",
          audioSrc: "/es_man.mp3",
        },
        {
          challengeId: 3,
          imageSrc: "/woman.png",
          correct: false,
          text: "la mujer",
          audioSrc: "/es_woman.mp3",
        },
        {
          challengeId: 3,
          imageSrc: "/robot1.png",
          correct: true,
          text: "el robot",
          audioSrc: "/es_robot.mp3",
        },
      ]);
    

    console.log("Seeding finished");

    } catch(error) {
        console.error(error);
        throw new Error("Failed to seed database");
    }
};

main();