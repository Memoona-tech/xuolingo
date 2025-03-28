"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import { usePracticeModal } from "@/store/use-practice-modal";

export const PracticeModal = () =>{

    const [isClient, setIsclient] = useState(false);
    const {isOpen, close} = usePracticeModal();
    
    useEffect(()=>setIsclient(true),[]);


    if(!isClient){
        return null;
    }

    return(
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md lg:rounded-3xl rounded-3xl">
                <DialogHeader>
                    <div className="flex items-center justify-center w-full mb-5">
                        <Image src="/heart.svg"
                        alt="Hearts"
                        height={100}
                        width={100}
                        />
                    </div>
                </DialogHeader>
                <DialogTitle className="font-bold text-center text-2xl">
                    Prcatice lesson
                </DialogTitle>
                <DialogDescription  className="text-center text-base font-semibold">
                    Use practice lessons to regain hearts and points. You can&apos;t lose hearts or points in practice lessons
                </DialogDescription>

                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">

                        <Button 
                        variant="primary" 
                        className="w-full" 
                        size="lg" 
                        onClick={close}>
                            I understand
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}