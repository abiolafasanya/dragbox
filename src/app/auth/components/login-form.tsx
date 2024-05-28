"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import useLogin from '../hooks/useLogin';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Fragment, useState } from "react";
// import AlertMessage from '@/app/dashboard/components/alert-message';
import { Eye, EyeOff, Loader2 } from "lucide-react";
import useLogin from "../hooks/useLogin";

const LoginForm = ({
  handleLoginType,
}: {
  handleLoginType: (type: "Login" | "Create Account") => void;
}) => {
  const { form, onRegister, onLogin, error } = useLogin();
  const isLoading = form.formState.isSubmitting || form.formState.isLoading;
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((show) => !show);
  const [isLoginForm, setIsLoginForm] = useState(true);
  return (
    <Fragment>
      {isLoginForm && (
        <Form {...form}>
          <form method="post" onSubmit={form.handleSubmit(onLogin)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        {...field}
                        disabled={isLoading}
                      />
                      <div className="absolute right-2 top-2.5">
                        {showPassword ? (
                          <EyeOff size={20} onClick={toggleShowPassword} />
                        ) : (
                          <Eye size={20} onClick={toggleShowPassword} />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between gap-2 items-center">
              <Button
                variant="link"
                type="button"
                onClick={() => {
                  setIsLoginForm(false);
                  handleLoginType("Create Account");
                }}
                className="space-x-2"
              >
                <span>Create Account</span>
              </Button>
              <Button disabled={isLoading} className="space-x-2">
                {" "}
                {isLoading && (
                  <span className="animate-spin">
                    <Loader2 />
                  </span>
                )}
                <span>Login</span>
              </Button>
            </div>
          </form>
        </Form>
      )}

      {!isLoginForm && (
        <Form {...form}>
          <form method="post" onSubmit={form.handleSubmit(onRegister)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        {...field}
                        disabled={isLoading}
                      />
                      <div className="absolute right-2 top-2.5">
                        {showPassword ? (
                          <EyeOff size={20} onClick={toggleShowPassword} />
                        ) : (
                          <Eye size={20} onClick={toggleShowPassword} />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between gap-2 items-center">
              <Button
                variant="link"
                type="button"
                onClick={() => {
                  setIsLoginForm(true);
                  handleLoginType("Login");
                }}
                className="space-x-2"
              >
                <span>Login</span>
              </Button>
              <Button disabled={isLoading} className="space-x-2">
                {" "}
                {isLoading && (
                  <span className="animate-spin">
                    <Loader2 />
                  </span>
                )}
                <span>Create Account</span>
              </Button>
            </div>
          </form>
        </Form>
      )}
    </Fragment>
  );
};

export default LoginForm;
