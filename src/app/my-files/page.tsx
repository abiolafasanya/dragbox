"use client";
import Header from "@/components/shared/header";
import { useMyFiles } from "@/hooks/useMyFile";
import React from "react";
import Gallery from "./components/gallery";
import { useAuth } from "@/hooks/auth";
import { CarouselProvider } from "../(Home)/hooks/useModal";

export default function MyFilesPage() {
  const { user } = useAuth();
  return (
    <CarouselProvider>
      <main className="bg-white w-full">
        <Header linkClass="text-black text-base" />

        <section className="px-5 max-w-6xl mx-auto min-h-screen w-full overflow-clip">
          <article className="w-full">
            <h2 className="mt-12 text-2xl font-semibold">My Uploads</h2>
            {user?.uid && <MyUploadedFiles />}
          </article>
          <article className="mt-10 w-full">
            <h2 className="text-2xl font-semibold">Other Users Upload</h2>
            <OtherUsersUploadedFiles />
          </article>
        </section>
      </main>
    </CarouselProvider>
  );
}

function MyUploadedFiles() {
  const { uploads, user } = useMyFiles();
  const myUploads = uploads.filter((uploads) => uploads.uid === user?.uid);
  //   console.log(uploads);
  return (
    <div className="mt-5">
      <Gallery images={myUploads ?? []} />
    </div>
  );
}

function OtherUsersUploadedFiles() {
  const { uploads, user } = useMyFiles();
  const otherUsersUploads = uploads.filter(
    (upload) => upload.uid !== user?.uid
  );
  return (
    <div className="mt-5">
      <Gallery images={otherUsersUploads ?? []} />
    </div>
  );
}
