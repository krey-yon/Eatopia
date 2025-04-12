import useZodForm from "@/hooks/useZodForm";
import { SignupFormSchema } from "@/lib/definitions";
import { signup } from "@/app/(auth)/signup/actions";

export const useSignup = () => {
  const { onFormSubmit, control, reset, register, errors } = useZodForm(
    SignupFormSchema,
    signup,
  );
  return { onFormSubmit, control, register, reset, errors };
};
