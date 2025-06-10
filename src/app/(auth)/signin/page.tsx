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

  const handleGuestLogin = (email: string, password: string) => {
    // Find and set the input values directly
    const emailInput = document.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const passwordInput = document.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;

    if (emailInput && passwordInput) {
      emailInput.value = email;
      passwordInput.value = password;

      // Trigger change events to update form state
      emailInput.dispatchEvent(new Event("input", { bubbles: true }));
      passwordInput.dispatchEvent(new Event("input", { bubbles: true }));

      // Submit the form
      const form = document.querySelector("form");
      if (form) {
        form.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true })
        );
      }
    }
  };

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
            <Button className={"bg-white text-black mt-6 w-full"}>
              Submit
            </Button>

            {/* Guest Login Buttons */}
            <div className="mt-4 space-y-2">
              <p className="text-center text-sm text-gray-600 mb-2">
                Or login as guest:
              </p>

              <Button
                type="button"
                variant="outline"
                className="text-black bg-gray-100 w-full text-sm"
                onClick={() => handleGuestLogin("user@mail.com", "pass@!23")}
              >
                Login as Guest User
              </Button>

              <Button
                type="button"
                variant="outline"
                className="text-black bg-gray-100 w-full text-sm"
                onClick={() =>
                  handleGuestLogin("restaurant@mail.com", "pass@123")
                }
              >
                Login as Guest Restaurant Owner
              </Button>

              <Button
                type="button"
                variant="outline"
                className="text-black bg-gray-100 w-full text-sm"
                onClick={() => handleGuestLogin("rider@mail.com", "pass@123")}
              >
                Login as Guest Rider
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
