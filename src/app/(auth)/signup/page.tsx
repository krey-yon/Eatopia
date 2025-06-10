"use client";
import { useSignup } from "@/hooks/useSignup";
import FormGenerator from "@/components/form-generator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { control, errors, onFormSubmit, register } = useSignup();

  return (
    <div className="flex items-center min-h-screen justify-center p-4 bg-gray-100">
      <Card className="text-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:w-[30%] border-gray-600">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl text-black">
            Signup
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-black">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <form
            onSubmit={onFormSubmit}
            className="flex flex-col gap-y-3 sm:gap-y-4"
          >
            <FormGenerator
              inputType={"input"}
              register={register}
              name={"email"}
              errors={errors}
              placeholder={"Email"}
              type={"email"}
              label={"Email"}
            />
            <FormGenerator
              inputType={"input"}
              register={register}
              name={"password"}
              errors={errors}
              placeholder={"Password"}
              type={"password"}
              label={"Password"}
            />
            <FormGenerator
              inputType={"input"}
              register={register}
              name={"name"}
              errors={errors}
              placeholder={"Name"}
              type={"text"}
              label={"Name"}
            />
            <FormGenerator
              inputType={"input"}
              register={register}
              name={"address"}
              errors={errors}
              placeholder={"Address"}
              type={"text"}
              label={"Address"}
            />
            <FormGenerator
              control={control}
              inputType={"select"}
              register={register}
              name={"role"}
              errors={errors}
              placeholder={""}
              label={"Role"}
            />
            <Button className="bg-white text-black mt-4 sm:mt-6 w-full py-2 sm:py-3">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
