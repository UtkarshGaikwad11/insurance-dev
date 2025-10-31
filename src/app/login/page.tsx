"use client";

import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "@/firebase/firebase.config";
import { Globe  } from "lucide-react";


export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // ✅ Yup validation schema
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Minimum 6 characters")
            .required("Password is required"),
    });

    // ✅ Formik setup
    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await signInWithEmailAndPassword(auth, values.email, values.password);
                toast.success("Login Successful", {
                });
                router.push("/dashboard");
            } catch (err: any) {
                toast.error("Login Failed", {
                    description: "Invalid email or password",
                });
            } finally {
                setLoading(false);
            }
        },
    });

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            toast.success("Login Successful with Google");
            router.push("/dashboard");
        } catch (error: any) {
            toast.error("Google Sign-in Failed", {
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 px-4">
            {loading && <Loader text="Signing in..." />}

            <div className="bg-white shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md border border-gray-100">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                        <LogIn className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-500 text-sm">Sign in to continue to your account</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`pl-11 h-12 border-2 transition-all duration-200 ${formik.touched.email && formik.errors.email
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                                    }`}
                            />
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-xs mt-1.5 ml-1">
                                {formik.errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password Field with Eye Icon */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <Link href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-700 hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`pl-11 pr-11 h-12 border-2 transition-all duration-200 ${formik.touched.password && formik.errors.password
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-xs mt-1.5 ml-1">
                                {formik.errors.password}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full h-12 bg-linear-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-base mt-6"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Logging in...
                            </span>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>

                <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full h-12 bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-medium flex items-center justify-center gap-2 mt-3 transition-all duration-200"
                    disabled={loading}
                >
                    <Globe  className="w-5 h-5" />
                    Continue with Google
                </Button>


                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">New to our platform?</span>
                    </div>
                </div>

                {/* Sign Up Link */}
                <p className="text-center">
                    <Link
                        href="/signup"
                        className="inline-flex items-center justify-center w-full h-11 px-4 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                    >
                        Create an account
                    </Link>
                </p>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-500 mt-8">
                By signing in, you agree to our{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                </Link>
            </p>
        </div>
    );
}