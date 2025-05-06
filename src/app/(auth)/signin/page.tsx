"use client";
import { useLogin } from "@/hooks/useLogin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormGenerator from "@/components/form-generator";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { errors, onFormSubmit, register } = useLogin();

  return (
    <div className={"h-screen flex items-center justify-center bg-gray-100"}>
      <Card className={"text-white w-[30%] border-gray-600 "}>
        <CardHeader>
          <CardTitle className="text-2xl text-black">Login</CardTitle>
          <CardDescription className="text-black">
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onFormSubmit} className={"flex flex-col gap-y-2"}>
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
            <Button className={"bg-white text-black mt-6"}>Submit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
