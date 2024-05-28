"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/auth";

const formSchema = z.object({
  username: z.string().email().nonempty().max(50).trim(),
  password: z.string().nonempty().max(50).trim(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const defaultValues: FormSchemaType = {
  username: "",
  password: "",
};

const useLogin = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { login, status } = useAuth();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onLogin(values: FormSchemaType) {
    form.control._updateFormState({ isLoading: true });
    console.log(values);
    setError("");
    const { password, username } = values;
    await login({ email: username, password });

    setTimeout(() => {
      form.control._updateFormState({ isLoading: status === "success" });
      form.reset();
    }, 1000);
  }
  async function onRegister(values: FormSchemaType) {
    form.control._updateFormState({ isLoading: true });
    console.log(values);
    setError("");
    const { password, username } = values;
    await login({ email: username, password });

    setTimeout(() => {
      form.control._updateFormState({ isLoading: status === "success" });
      form.reset();
    }, 1000);
  }

  return { error, form, onLogin, onRegister };
};

export default useLogin;
