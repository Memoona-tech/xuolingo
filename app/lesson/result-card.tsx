import { cn } from "@/lib/utils";
import Image from "next/image";


interface Props {
  variant: "hearts" | "points";
  value: number;
}

export const ResultCard = ({ variant, value }: Props) => {
  const isHearts = variant === "hearts";
  const label = isHearts ? "Hearts Left" : "Total XP";
  const imageSrc = isHearts ? "/heart.svg" : "/points.svg";


  return (

    <>
    <div
      className={cn(
        "w-32 rounded-2xl border-2 overflow-hidden",
        variant === "hearts" ? "border-rose-400" : "border-orange-400"
      )}
    >
      <div
        className={cn(
          "p-2 text-center text-white font-bold uppercase text-xs",
          variant === "hearts" ? "bg-rose-500" : "bg-orange-500"
        )}
      >
        {label}
      </div>
      <div className=
        "bg-white  rounded-t-xl p-4 flex items-center justify-center gap-2">
        <Image src={imageSrc} alt={label} width={20} height={20} />
        <span
          className={cn(
            "text-lg font-bold",
             variant === "hearts" ? "text-rose-500" : "text-orange-500"
          )}
        >
          {value}
        </span>
      </div>
    </div>

    </>
  );
};
