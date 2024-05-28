import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function Thumbnail({
  className,
  alt,
  src,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  const classStyle = ""; //`absolute bottom-5  max-w-max z-100 hidden hidden group-hover:flex gap-5 overflow-hidden`;
  return (
    <div className={twMerge(classStyle, className)}>
      <article className={`w-[220px] h-[150px]  flex-shrink-0 `}>
        <Image
          src={src}
          alt={alt}
          width={150}
          height={220}
          className="w-full h-full object-cover object-fit shadow rounded-lg"
        />
      </article>
    </div>
  );
}
