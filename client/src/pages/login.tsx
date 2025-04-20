"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { Link } from "react-router-dom";
import { useLogin } from "@/auth/firebase.auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function Login() {
  const { loginUser, googleLogin } = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginUser(values.email, values.password);
  }

  function handleGoogleLogin() {
    googleLogin();
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-6">
      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-md w-full max-w-xs sm:max-w-sm">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">
          Login
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="text-sm sm:text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="text-sm sm:text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Forgot Password */}
            <div className="text-center text-xs sm:text-sm text-blue-500 hover:underline">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <Button
              onClick={() =>
                loginUser(form.getValues().email, form.getValues().password)
              }
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-full bg-blue-500 text-white text-sm sm:text-base"
            >
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        {/* Google Login */}
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full m-auto flex items-center justify-center gap-2 mt-4 sm:mt-6 text-sm sm:text-base"
        >
          <FcGoogle size={18} />
          Continue with Google
        </Button>

        {/* Signup */}
        <div className="text-center text-xs sm:text-sm mt-4 sm:mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
