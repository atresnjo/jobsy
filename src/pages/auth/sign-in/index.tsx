import Layout from "@/components/layout";
import { Input } from "@/components/ui/input";
import { useSignIn } from "@clerk/nextjs";
import { ReactElement } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Link from "next/link";

const FormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

type FormSchemaType = {
    email: string
    password: string
}

const SignInPage = () => {
    const { signIn, setActive } = useSignIn();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
        try {
            const result = await toast.promise(
                signIn!.create({
                    identifier: data.email,
                    password: data.password,
                }),
                {
                    loading: "Checking credentials...",
                    success: "Welcome 🙋",
                    error: "There was an error with your credentials",
                },
                {
                    success: {
                        duration: 1000,
                    },
                }
            )

            if (!result) {
                toast.error('There was an error')
                return;
            }

            await setActive!({ session: result.createdSessionId })
            router.push('/dashboard')

        } catch (error) {
        }
    }
    return (
        <div className="flex h-screen container">
            <form className="m-auto max-w-md w-full" onSubmit={handleSubmit(onSubmit)}>
                <label className="mb-5 block">
                    <Input
                        className="border-1 rounded-none border border-black"
                        {...register("email")}
                        type="text"
                        placeholder="Email Address"
                    />
                </label>
                {errors.email && (
                    <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
                <label className="mb-5 block">
                    <Input
                        className="border-1 rounded-none border border-black"
                        {...register("password")}
                        type="password"
                        placeholder="Create Password"
                    />
                </label>
                {errors.password && (
                    <p className="text-sm text-red-600">
                        {errors.password.message}
                    </p>
                )}
                <span>Don't have an account yet?</span>
                <Link
                    className="ml-3 font-medium hover:underline"
                    href="/auth/sign-up/"
                >
                    Sign up
                </Link>
                <Button disabled={isSubmitting} className="mb-2 mt-2 w-full" type="submit">
                    Login
                </Button>
            </form>
        </div>
    )
}

SignInPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default SignInPage