import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/use-exit-modal";
interface Props {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
}

import { InfinityIcon, X } from "lucide-react";
import Image from "next/image";
import React from "react";

export const Header = ({
  hearts,
  percentage,
  hasActiveSubscription,
}: Props) => {

    const {open} = useExitModal();
  return (
      <header className="lg:pt-[30px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full mb-6">

<X 
    onClick= {open}
    className="text-slate-500 hover:opacity-75 transition cursor-pointer"
/>

<Progress value={percentage} />

<div className="text-rose-500 font-bold items-center flex flex-row">
    <Image 
    src="/heart.svg"
    width={28}
    height={28}
    alt="Heart"
    className="mr-2"
    />
    {hasActiveSubscription
    ? <InfinityIcon className="h-6 w-6 stroke-[3]" /> //shrink-0
    : hearts}
</div>
</header>

  );
};
