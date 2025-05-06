import useZodForm from "@/hooks/useZodForm";
import { SignupFormSchema } from "@/lib/definitions";
import { signup } from "@/app/(auth)/signup/actions";
import { useRouter } from "next/navigation";
import { z } from "zod";

export const useSignup = () => {
  const router = useRouter();

  const handleSignUp = async (values: z.infer<typeof SignupFormSchema>) => {
    const result = await signup(values);

    if (result.message === "User created successfully!") {
      router.push("/signin");
    } else {
      console.error(result.message);
    }
  };
  const { onFormSubmit, control, reset, register, errors } = useZodForm(
    SignupFormSchema,
    handleSignUp,
  );
  return { onFormSubmit, control, register, reset, errors };
};
