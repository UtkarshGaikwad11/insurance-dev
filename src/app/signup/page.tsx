"use client";

import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, UserPlus, Check } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "@/firebase/firebase.config";
import { Globe } from "lucide-react";


export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // ✅ Yup validation schema
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    // ✅ Formik setup
    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await createUserWithEmailAndPassword(auth, values.email, values.password);
                toast.success("Account Created", {

                });
                router.push("/login");
            } catch (err: any) {
                toast.error("Signup Failed", {
                    description: err.message || "Something went wrong",
                });
            } finally {
                setLoading(false);
            }
        },
    });

    // Password strength indicator
    const getPasswordStrength = (password: string) => {
        if (!password) return { strength: 0, label: "", color: "" };
        if (password.length < 6) return { strength: 33, label: "Weak", color: "bg-red-500" };
        if (password.length < 10) return { strength: 66, label: "Good", color: "bg-yellow-500" };
        return { strength: 100, label: "Strong", color: "bg-green-500" };
    };

    const passwordStrength = getPasswordStrength(formik.values.password);

    const handleGoogleSignup = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            toast.success("Account Created with Google");
            router.push("/login");
        } catch (error: any) {
            toast.error("Google Sign-up Failed", {
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-green-50 via-white to-blue-50 px-4">
            {loading && <Loader text="Creating account..." />}

            <div className="bg-white shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md border border-gray-100">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-green-500 to-blue-600 rounded-full mb-4 shadow-lg">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                    <p className="text-gray-500 text-sm">Join us today and get started</p>
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
                                        : "border-gray-200 focus:border-green-500 focus:ring-green-200"
                                    }`}
                            />
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-xs mt-1.5 ml-1">
                                {formik.errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Minimum 6 characters"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`pl-11 pr-11 h-12 border-2 transition-all duration-200 ${formik.touched.password && formik.errors.password
                                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                        : "border-gray-200 focus:border-green-500 focus:ring-green-200"
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

                        {/* Password Strength Indicator */}
                        {formik.values.password && (
                            <div className="mt-2">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-600">Password strength</span>
                                    <span className={`text-xs font-medium ${passwordStrength.strength === 100 ? "text-green-600" :
                                            passwordStrength.strength === 66 ? "text-yellow-600" :
                                                "text-red-600"
                                        }`}>
                                        {passwordStrength.label}
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                                        style={{ width: `${passwordStrength.strength}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-xs mt-1.5 ml-1">
                                {formik.errors.password}
                            </p>
                        )}
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <p className="text-xs font-medium text-gray-700 mb-2">Password requirements:</p>
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${formik.values.password.length >= 6 ? "bg-green-500" : "bg-gray-300"
                                    }`}>
                                    {formik.values.password.length >= 6 && (
                                        <Check className="w-3 h-3 text-white" />
                                    )}
                                </div>
                                <span className="text-xs text-gray-600">At least 6 characters</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${/[A-Z]/.test(formik.values.password) ? "bg-green-500" : "bg-gray-300"
                                    }`}>
                                    {/[A-Z]/.test(formik.values.password) && (
                                        <Check className="w-3 h-3 text-white" />
                                    )}
                                </div>
                                <span className="text-xs text-gray-600">One uppercase letter (recommended)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${/[0-9]/.test(formik.values.password) ? "bg-green-500" : "bg-gray-300"
                                    }`}>
                                    {/[0-9]/.test(formik.values.password) && (
                                        <Check className="w-3 h-3 text-white" />
                                    )}
                                </div>
                                <span className="text-xs text-gray-600">One number (recommended)</span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full h-12 bg-linear-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-base mt-6"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Creating account...
                            </span>
                        ) : (
                            "Create Account"
                        )}
                    </Button>
                </form>

                <Button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="w-full h-12 bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-medium flex items-center justify-center gap-2 mt-4 transition-all duration-200"
                    disabled={loading}
                >
                    <Globe className="w-5 h-5 text-blue-500" />
                    Continue with Google
                </Button>


                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                    </div>
                </div>

                {/* Login Link */}
                <p className="text-center">
                    <Link
                        href="/login"
                        className="inline-flex items-center justify-center w-full h-11 px-4 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                    >
                        Sign in instead
                    </Link>
                </p>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-500 mt-8">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-green-600 hover:underline">
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-green-600 hover:underline">
                    Privacy Policy
                </Link>
            </p>
        </div>
    );
}