"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NotFoundProps {
  error: Error;
  reset: () => void;
}

export default function NotFound({ error, reset }: NotFoundProps) {
  const router = useRouter();
  const back = () => router.back();
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <Image
        src={"/notfound.gif"}
        width={300}
        height={300}
        alt="error"
        className="rounded-full"
      />
      <h1>{error?.message || "Page not found"}</h1>
      <div className="flex items-center justify-center gap-4">
        <button
          className="border-2 border-black px-5 py-3 my-5 rounded-lg outline-none"
          onClick={reset}
        >
          Try again
        </button>
        <button
          onClick={back}
          className="rounded-lg py-3 px-5  bg-black text-white fibt-semibold"
        >
          Back
        </button>
      </div>
    </div>
  );
}
