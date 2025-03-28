import { cn } from "@/lib/utils";
import React from "react";
import Image from 'next/image'
import Link from 'next/link'
import {SidebarItems} from './sidebar-items'
import { ClerkLoaded,ClerkLoading, UserButton
} from "@clerk/nextjs";
import { Loader } from "lucide-react";

interface SidebarProps {
    className?: string;
}



export const Sidebar = ({className}:SidebarProps) => {
  return (
    
        <div className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", className,)}>

        <Link href="/learn">
            <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3 '>
                <Image src="/mascot.svg" width={40} height={40} alt='mascot'/>
                <h1 className='text-2xl font-extrabold text-green-600 tracking-wide'>Duolingo</h1>
            </div>
        </Link>

        <div className="flex flex-col gap-y-2 flex-1">
            <SidebarItems label="learn" href="/learn" iconSrc="/learn.svg"/>
            <SidebarItems label="leaderboard" href="/leaderboard" iconSrc="leaderboard.svg"/>
            <SidebarItems label="quests" href="/quests" iconSrc="/quests.svg"/>
            <SidebarItems label="shop" href="/shop" iconSrc="/shop.svg"/>
        </div>

        <div className="p-4">
            <ClerkLoading>
                <Loader className="h-5 w-5 animate-spin text-muted-foreground"/>
            </ClerkLoading>
            <ClerkLoaded>
                <UserButton afterSignOutUrl="/"/>
            </ClerkLoaded>
        </div>
    </div>
    
    
  );
};
