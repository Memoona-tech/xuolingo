import Image from "next/image";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg w-auto flex items-center justify-evenly h-ful">
        
      <Button size="lg" variant="Ghost" className="w-ful">
          <Image
            src="es.svg"
            alt="Spanish"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Spanish
        </Button>

        <Button size="lg" variant="Ghost" className="w-ful">
          <Image
            src="jp.svg"
            alt="Japanese"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Japanese
        </Button>
        <Button size="lg" variant="Ghost" className="w-ful">
          <Image
            src="it.svg"
            alt="Itanlian"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Italian
        </Button>
        <Button size="lg" variant="Ghost" className="w-ful">
          <Image
            src="hr.svg"
            alt="Croatian"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Croatian
        </Button>

        <Button size="lg" variant="Ghost" className="w-ful">
          <Image
            src="fr.svg"
            alt="French"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          French
        </Button>

        
        
      </div>
    </footer>
  );
};
