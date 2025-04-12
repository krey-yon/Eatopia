import useZodForm from "@/hooks/useZodForm";
import {SigninFormSchema} from "@/lib/definitions";
import {signin} from "@/app/(auth)/signin/actions";

export const useLogin = () => {
    const {onFormSubmit,control,reset,register,errors} = useZodForm(SigninFormSchema,signin);
    return {onFormSubmit,control,register,reset,errors};
}