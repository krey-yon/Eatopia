import useZodForm from "@/hooks/useZodForm";
import { SigninFormSchema } from "@/lib/definitions";
import { signin } from "@/app/(auth)/signin/actions";
import { useRouter } from "next/navigation";
import { z } from "zod";

export const useLogin = () => {
  const router = useRouter();

  const handleSignin = async (values: z.infer<typeof SigninFormSchema>) => {
    const result = await signin(values);

    if (result.message === "signin successful") {
      router.push("/dashboard");
    } else {
      console.error(result.message);
    }
  };
  const { onFormSubmit, control, reset, register, errors } = useZodForm(
    SigninFormSchema,
    handleSignin,
  );
  return { onFormSubmit, control, register, reset, errors };
};
