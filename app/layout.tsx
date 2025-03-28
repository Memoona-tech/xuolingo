import type { Metadata } from "next";
//import { Nunito } from "next/font/google";
import { Quicksand } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  // Optionally specify weights if needed, e.g. ["400", "600", "700"]
  // weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Duolingo Clone",
  description: "By Memoona",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${quicksand.variable} antialiased`}>
        <Toaster/>
        <ExitModal/>
        <HeartsModal/>
        <PracticeModal/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
