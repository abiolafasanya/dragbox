"use client";
import Header from "@/components/shared/header";
// import { useRouter } from "next/navigation";
import { SearchInput, HomeGallery } from "./component/HomeGallery";
import { ImageContextProvider } from "./hooks/useGallery";
import { CarouselProvider } from "./hooks/useModal";

function ContextWrapper({ children }: { children: React.ReactNode }) {
  return <ImageContextProvider>{children}</ImageContextProvider>;
}

export default function Home() {

  return (
    <ContextWrapper>
      <CarouselProvider>
        <div className=" bg-white">
          <section className="bg-hero-image h-[500px] bg-cover bg-center w-full">
            <div className="w-full h-full bg-black/50">
              <Header />
              <article className="w-full h-full flex items-center justify-center flex-col gap-5 backdrop-blur-sm bg-blend-overlay">
                <div className="text-white text-2xl text-center font-medium">
                  The best free stock photos, royalty free images & videos
                  shared by creators.
                </div>
                <SearchInput />
              </article>
            </div>
          </section>

          <section className="px-5 max-w-[1280px] mt-20 mx-auto">
            <h2 className="text-2xl font-semi-bold my-5">Free Stock Image</h2>
            <HomeGallery />
          </section>
        </div>
      </CarouselProvider>
    </ContextWrapper>
  );
}
