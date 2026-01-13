import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import { Zap, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { apiRequest } from "@/utils/apiRequest";
import { Spinner } from "@/components/ui/spinner";
import { signinValidationSchema } from "@/validation/auth/auth.validation";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "@/store";
import type { IUser } from "@/@types/interface/user.interface";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setIsLoading(true);

    try {
      // Validate form data
      const result = signinValidationSchema.safeParse({
        email,
        password,
      });

      if (!result.success) {
        const errors: { email?: string; password?: string } = {};
        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as "email" | "password";
          if (!errors[field]) {
            errors[field] = issue.message;
          }
        });
        setFieldErrors(errors);
        setIsLoading(false);
        return;
      }

      const payload = result.data;
      const response = await apiRequest("POST", `/auth/login`, payload);

      // Handle successful login
      // Token is in HTTP-only cookie, just get user data
      if (response) {
        const { user } = response as { user: IUser };
        login(user, ""); // Token is empty since it's in cookie

        // Redirect to browse gigs page
        navigate("/gigs");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-page flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md ">
        {/* Login Card */}
        <Card className="bg-white border-gray-200 shadow-xl">
          <CardHeader>
            <div className="flex justify-center items-center mb-5">
              <div className="inline-flex items-center space-x-2 ">
                <div className="w-12 h-12 bg-gradient-brand-icon rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold text-gradient-brand">
                  GigFlow
                </span>
              </div>
            </div>
            <CardTitle className="text-2xl text-gray-900">Sign In</CardTitle>
            <CardDescription className="text-gray-600">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Error Message */}
              {error && (
                <Alert
                  variant="error"
                  icon={<AlertCircle className="w-4 h-4" />}
                >
                  {error}
                </Alert>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10 h-11"
                    required
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-sm text-red-600">{fieldErrors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-12 h-11"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-sm text-red-600">{fieldErrors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              {/* <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </a>
              </div> */}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full btn-gradient-primary h-11 text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
                {isLoading && <Spinner />}
              </Button>
              <Button
                variant="ghost"
                className="w-full h-11"
                onClick={() => {
                  navigate("/");
                }}
              >
                Go to Home
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
