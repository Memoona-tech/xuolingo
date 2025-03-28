"use client";
import React from 'react'
import {Button} from "./ui/button"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';



interface Props{
    label: string,
    iconSrc:string,
    href:string,
}


export const SidebarItems = ({label,iconSrc,href}:Props) => {
    const pathName = usePathname();
    const active = pathName == href;
  return (
    <Button variant={ active ? "SidebarOutline" : "Sidebar"} className='justify-start h-[52px]' asChild>
        <Link href={href}>
        <Image src={iconSrc} alt={label} height={32} width={32} className="mr-5" />
        {label}</Link>
    </Button>
  )
}

