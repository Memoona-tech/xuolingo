"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 to-indigo-600 text-white p-4">
      <motion.h1
        className="text-9xl font-extrabold mb-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Image src="/planet.png" alt="404" width={200} height={200} />
        404
      </motion.h1>
      <motion.p
        className="text-2xl mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
         We are lost now.
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}>

        <Link href="/" passHref>
          <Button className="mt-4"> 
            Let&apos;s go home
          </Button>
        </Link>       
      </motion.div>
    </div>
  );
}
