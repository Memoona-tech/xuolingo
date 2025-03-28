import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
}

export const Header = ({ title }: Props) => {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-neutral-200 mb-5">
      
      <div className="relative flex items-center justify-center h-12 px-4">
        
        <Link href="/courses" className="absolute left-4">
          <Button variant="Ghost" size="sm">
            <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
          </Button>
        </Link>

        <h1 className="font-bold text-lg text-neutral-700">
          {title}
        </h1>
      </div>
    </div>
  );
};
