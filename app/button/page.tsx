import React from 'react'
import {Button} from "@/components/ui/button";

const Buttonpage = () => {
  return (
    <div className='flex flex-col max-w-[200px] p-4 space-y-4'>
        <Button variant="default">Default</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="PrimaryOutline">Primary Outline</Button>
        <Button variant="Secondry">Secondary</Button>
        <Button variant="SecondryOutline">Secondry Outline</Button>
        <Button variant="Danger">Danger</Button>
        <Button variant="DangerOutline">Danger Outline</Button>
        <Button variant="Super">Super</Button>
        <Button variant="SuperOutline">Super Outline</Button>
        <Button variant="Ghost">Ghost</Button>
        <Button variant="Sidebar">Sidebar</Button>
        <Button variant="SidebarOutline">Sidebar Outline</Button>
        
    </div>
  )
}

export default Buttonpage;