"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./components/login-form";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.uid) {
      console.log(user)
      router.push("/");
    }
  }, [user?.uid]);

  const [type, setType] = useState<"Login" | "Create Account">("Login");
  function handleLoginType(type: "Login" | "Create Account") {
    setType(type);
  }

  return (
    <div className="flex w-full items-center justify-center p-5  min-h-screen">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>{type}</CardTitle>
          <CardDescription>
            Login in to your dashboard to upload and view gallery
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <LoginForm handleLoginType={handleLoginType} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
