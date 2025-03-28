import Image from "next/image";
import {Button} from "../components/ui/button"
import Link from 'next/link'

interface Props{
activeCourse: typeof courses.$inferSelect;
hearts: number,
points: number,
hasActiveSubscription: boolean
}

import React from 'react'
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

export const UserProgress = ({activeCourse, points , hearts , hasActiveSubscription}:Props) => {
  return (
    <div className='flex items-center jsutify-between gap-x-2 w-full'>
      <Link href="/courses">
        <Button variant="Ghost">
          <Image src={activeCourse.imageSrc} alt={activeCourse.title} width={32} height={32} className="rounded-md border "/>
        </Button>
      </Link>

      <Link href="/shop">
        <Button variant="Ghost" className="text-orange-500">
            <Image src="/points.svg" height={28} width={28} alt="Points" className="mr-1" />{points}
        </Button>
      </Link>

      <Link href="/shop">
        <Button variant="Ghost" className="text-rose-500">
            <Image src="/heart.svg" height={22} width={22} alt="Hearts" className="mr-1" />
            {hasActiveSubscription
            ? <InfinityIcon className="h-4 w-4 stroke-[3]"/> 
            : hearts}
        </Button>
      </Link>

      
    </ div>
  )
}
