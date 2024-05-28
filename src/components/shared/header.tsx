"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";

const Header = ({
  linkClass = "text-slate-100 text-base",
}: {
  linkClass?: string;
}) => {
  const router = useRouter();
  const loginAction = () => router.push("/auth");
  const { user, logout } = useAuth();
  return (
    <header className="px-5 md:px-0 relative w-full max-w-6xl mx-auto">
      <menu className="w-full gap-5 flex justify-between">
        <Link href={"/"}>
          <h2 className="text-2xl text-center font-semibold my-4">
            <span className="text-amber-700">Drag</span>
            <span className="text-stone-400">Box</span>
          </h2>
        </Link>
        <div className="flex gap-2 items-center">
          <Link className={linkClass} href={"/upload"}>
            Upload
          </Link>
          {user?.uid && (
            <Link className={linkClass} href={"/my-files"}>
              My Files
            </Link>
          )}

          {!user?.uid && (
            <>
              <Button variant={"default"} onClick={loginAction}>
                Login
              </Button>
            </>
          )}

          {user?.uid && (
            <Button variant={"default"} onClick={logout}>
              Logout
            </Button>
          )}
        </div>
      </menu>
    </header>
  );
};

export default Header;
