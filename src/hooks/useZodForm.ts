import { ZodSchema, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const useZodForm = (
  schema: ZodSchema,
  action: (values: z.infer<ZodSchema>) => void,
) => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  const onFormSubmit = handleSubmit(async (values) => {
    action(values);
  });
  return { reset, register, onFormSubmit, control, errors };
};

export default useZodForm;
