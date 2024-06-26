"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "@/hooks/auth";


const formSchema = z.object({
  email: z.string().email().nonempty().max(50).trim(),
  password: z.string().nonempty().max(50).trim(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const defaultValues: FormSchemaType = {
  email: "",
  password: "",
};

const useLogin = () => {
  const [error, setError] = useState("");
  const { login, register, status } = useAuth();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onLogin(values: FormSchemaType) {
    form.control._updateFormState({ isLoading: true });
    setError("");
    const { password, email } = values;
    await login({ email, password });

    setTimeout(() => {
      form.control._updateFormState({ isLoading: status === "success" });
      form.reset();
    }, 1000);
  }
  async function onRegister(values: FormSchemaType) {
    form.control._updateFormState({ isLoading: true });
    setError("");
    const { password, email } = values;
    await register({ email, password });

    setTimeout(() => {
      form.control._updateFormState({ isLoading: status === "success" });
      form.reset();
    }, 1000);
  }

  return { error, form, onLogin, onRegister };
};

export default useLogin;
