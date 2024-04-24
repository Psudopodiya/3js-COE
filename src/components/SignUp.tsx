import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const signupSchema = z
    .object({
        username: z.string().min(1, { message: "Username cannot be empty" }),
        email: z.string().email({ message: "Invalid Email address" }),
        password: z
            .string()
            .min(6, { message: "Password must contain 6 character" })
            .regex(/[a-z]/, {
                message: "Password must contain lowercase character",
            })
            .regex(/[A-Z]/, {
                message: "Password must contain uppercase character",
            })
            .regex(/[!@#$%^&*(),.?]/, {
                message: "Password must contain special character",
            }),
        confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"],
    });

// type SignUpFromValues = z.infer<typeof signupSchema>;

export default function SignUp() {
    const form = useForm<z.infer<typeof signupSchema>>({
        mode: "onChange",
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirm_password: "",
        },
    });

    function onSubmit(data: z.infer<typeof signupSchema>) {
        console.log(data);
    }

    return (
        <>
            <p className="mb-8">
                {" "}
                Already have an account?{" "}
                <a
                    href=""
                    className="text-gray-400 underline hover:text-blue-400"
                >
                    Sign in
                </a>
            </p>
            <Form {...form} className="">
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        className="space-y-0"
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Username"
                                        {...field}
                                        className="border-0 border-b-[1px] border-gray-400 px-0 text-base text-gray-700 shadow-none"
                                    />
                                </FormControl>
                                <FormMessage className="mt-1 text-red-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="example@consultadd.com"
                                        {...field}
                                        className="border-0 border-b-[1px] border-gray-400 px-0 text-base text-gray-700 shadow-none"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Password"
                                        {...field}
                                        className="border-0 border-b-[1px] border-gray-400 px-0 text-base text-gray-700 shadow-none"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Confirm password"
                                        {...field}
                                        className="border-0 border-b-[1px] border-gray-400 px-0 text-base text-gray-700 shadow-none"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="min-w-full rounded-xl bg-[#fb815a] px-4 py-6 text-white transition duration-300 ease-in-out hover:bg-[#f8754a]"
                    >
                        Sign up
                    </Button>
                </form>
            </Form>
        </>
    );
}
