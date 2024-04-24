import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    Email: z.string().email({
        message: "Invalid Email Address",
    }),
    Password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[a-z]/, {
            message: "Password must contain lowercase character",
        })
        .regex(/[A-Z]/, {
            message: "Password must uppercase character",
        })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
            message: "Password must contain at least one symbol",
        }),
});

export default function LoginForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        mode: 'onChange',
        resolver: zodResolver(formSchema),
        defaultValues: {
            Email: "",
            Password: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <>
            <p className="mb-8">
                {" "}
                Don't have an account?{" "}
                <a
                    href=""
                    className="text-gray-400 underline hover:text-blue-400"
                >
                    Signup
                </a>
            </p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="Email"
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
                        name="Password"
                        render={({ field }) => (
                            <FormItem className="">
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
                    <Button
                        className="mt-4 min-w-full rounded-xl bg-[#fb815a] px-4 py-6 text-white transition duration-300 ease-in-out hover:bg-gray-500"
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </>
    );
}
