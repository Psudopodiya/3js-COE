import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
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

const registerSchema = z
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

type RegisterFromValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const form = useForm<RegisterFromValues>({
        mode: "onChange",
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirm_password: "",
        },
    });

    function onSubmit(data: z.infer<typeof registerSchema>) {
        console.log(data);
    }

    return (
        <>
            <p className="mb-8">
                {" "}
                Already have an account?{" "}
                <Link to="/login" className="underline hover:text-blue-400">
                    Log in
                </Link>
            </p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
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
                                        placeholder="Email"
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
                                        type="password"
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
                                        type="password"
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
