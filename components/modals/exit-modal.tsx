"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { useExitModal } from "@/store/use-exit-modal";

export const ExitModal = () =>{

    const router = useRouter();
    const [isClient, setIsclient] = useState(false);
    const {isOpen, close} = useExitModal();
    
    useEffect(()=>setIsclient(true),[]);

    if(!isClient){
        return null;
    }

    return(
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md lg:rounded-3xl rounded-3xl">
                <DialogHeader>
                    <div className="flex items-center justify-center w-full mb-5">
                        <Image src="/mascot_sad.svg"
                        alt="Mascot"
                        height={80}
                        width={80}
                        />
                    </div>
                </DialogHeader>
                <DialogTitle className="font-bold text-center text-2xl">
                    Wait, don&apos;t go!
                </DialogTitle>
                <DialogDescription  className="text-center text-base font-semibold">
                    You&apos;re about to leave the lesson. Are you sure?
                </DialogDescription>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                       <Button variant="primary" className="w-full" size="lg" onClick={close}>
                            Keep learning
                        </Button>
                        <Button variant="DangerOutline" className="w-full" size="lg" onClick={()=>{
                            close();
                            router.push("/learn")
                        }}>
                            End session
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}