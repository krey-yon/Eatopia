import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@hookform/error-message";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormGeneratorProps {
  type?: "text" | "email" | "password" | "number";
  inputType: "select" | "input" | "textarea";
  label?: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  errors: FieldErrors;
  lines?: number;
  control?: Control<FieldValues>;
}

const FormGenerator = ({
  control,
  errors,
  inputType,
  label,
  name,
  placeholder,
  register,
  type,
}: FormGeneratorProps) => {
  switch (inputType) {
    case "input": {
      return (
        <div className={"text-white flex flex-col space-y-1"}>
          <Label
            htmlFor={name}
            className={
              "text-gray-900 select-none cursor-pointer flex items-center space-x-2 transition duration-150"
            }
          >
            {label}
          </Label>
          <Input
            id={name}
            className={"rounded-md border-gray-600 text-black "}
            type={type}
            placeholder={placeholder}
            {...register(name)}
          />
          <ErrorMessage
            name={name}
            errors={errors}
            render={({ message }) => (
              <p className={"text-red-600 text-sm ml-2"}>{message}</p>
            )}
          />
        </div>
      );
    }
    case "select": {
      return (
        <div className={"text-white flex flex-col space-y-1"}>
          <Label
            htmlFor={name}
            className={
              "text-gray-800 hover:text-white select-none cursor-pointer flex items-center space-x-2 transition duration-150"
            }
          >
            {label}
          </Label>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="rounded-md border-gray-600 text-black w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className={"border-gray-600 bg-black"}>
                  <SelectItem
                    className={"text-white hover:cursor-pointer"}
                    value="USER"
                  >
                    USER
                  </SelectItem>
                  <SelectItem
                    className={"text-white hover:cursor-pointer"}
                    value="RIDER"
                  >
                    RIDER
                  </SelectItem>
                  <SelectItem
                    className={"text-white hover:cursor-pointer"}
                    value="RESTAURANT"
                  >
                    RESTAURANT
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <ErrorMessage
            name={name}
            errors={errors}
            render={({ message }) => (
              <p className={"text-red-600 text-sm ml-2"}>{message}</p>
            )}
          />
        </div>
      );
    }
  }
};

export default FormGenerator;
