import Layout from "@/components/layout";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@clerk/nextjs";
import { ReactElement } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type FormSchemaType = {
  email: string
  password: string
}

const SignUpPage = () => {
  const { signUp, setActive } = useSignUp();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  })

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const result = await toast.promise(
        signUp!.create({
          emailAddress: data.email,
          password: data.password,
        }),
        {
          loading: "Creating account...",
          success: "Check your E-Mail to confirm your account! 🙋",
          error: "There was an error creating your account",
        },
        {
          loading: {
            icon: "🤔",
          },
          success: {
            duration: 3000,
            icon: "🚀",
          },
        }
      )

      // we're getting missing_requirements since the email confirmation is still missing.
      if (!result || result.status !== "complete" && result.status !== "missing_requirements") {
        toast.error('There was an error while creating the account')
        return;
      }

      await setActive!({ session: result.createdSessionId })
      await signUp?.prepareEmailAddressVerification({
        strategy: "email_link",
        redirectUrl: "http://localhost:3000/jobs"
      })

      await setActive!({ session: null })
      reset();

    } catch (error) {
    }
  }


  const renderView = () => {
    if (signUp?.status == 'missing_requirements') {
      return (
        <div className="m-auto w-full max-w-md">
          <h1 className="text-2xl">Please check your E-Mail! 🚀</h1>
        </div>
      )
    }

    return (
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
        <span>Already have an account?</span>
        <Link
          className="ml-3 font-medium hover:underline"
          href="/auth/sign-in/"
        >
          Login
        </Link>
        <Button disabled={isSubmitting} className="mb-2 mt-2 w-full" type="submit">
          Create Account
        </Button>
      </form>
    )
  }
  return (
    <div className="flex h-screen container">
      {renderView()}
    </div>
  )
}

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default SignUpPage