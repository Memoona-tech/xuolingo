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
import { useHeartsModal } from "@/store/use-hearts-modal";

export const HeartsModal = () =>{

    const router = useRouter();
    const [isClient, setIsclient] = useState(false);
    const {isOpen, close} = useHeartsModal();
    
    useEffect(()=>setIsclient(true),[]);

const onClick = () => {
    close();
    router.push("/shop")
}

    if(!isClient){
        return null;
    }

    return(
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md lg:rounded-3xl rounded-3xl">
                <DialogHeader>
                    <div className="flex items-center justify-center w-full mb-5">
                        <Image src="/mascot_bad.svg"
                        alt="Mascot"
                        height={80}
                        width={80}
                        />
                    </div>
                </DialogHeader>
                <DialogTitle className="font-bold text-center text-2xl">
                    You ran out of hearts!
                </DialogTitle>
                <DialogDescription  className="text-center text-base font-semibold">
                    Get Pro for unlimited hearts, or purchase them in the store.
                </DialogDescription>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                       <Button variant="primary" className="w-full" size="lg" onClick={onClick}>
                            Get unlimited hearts
                        </Button>
                        <Button variant="PrimaryOutline" className="w-full" size="lg" onClick={close}>
                            No thanks
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

}