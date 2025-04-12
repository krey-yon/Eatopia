"use client"
import {useSignup} from "@/hooks/useSignup";
import FormGenerator from "@/components/form-generator";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

const Page = () => {

    const {control,errors,onFormSubmit,register,reset} = useSignup()

    return <div className={"bg-black h-full flex items-center justify-center"}>
        <Card className={"text-white border-gray-600"}>
            <CardHeader>
                <CardTitle className="text-2xl">Signup</CardTitle>
                <CardDescription>
                    Enter your details below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onFormSubmit} className={"flex flex-col gap-y-2"}>
                    <FormGenerator inputType={"input"} register={register} name={"email"} errors={errors}
                                   placeholder={"Email"} type={"email"} label={"Email"}/>
                    <FormGenerator inputType={"input"} register={register} name={"password"} errors={errors}
                                   placeholder={"Password"} type={"password"} label={"Password"}/>
                    <FormGenerator inputType={"input"} register={register} name={"name"} errors={errors}
                                   placeholder={"Name"} type={"text"} label={"Name"}/>
                    <FormGenerator inputType={"input"} register={register} name={"address"} errors={errors}
                                   placeholder={"Address"} type={"text"} label={"Address"}/>
                    <FormGenerator control={control} inputType={"select"} register={register} name={"role"}
                                   errors={errors} placeholder={""} label={"Role"}/>
                    <Button className={"bg-white text-black mt-6"}>
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>

    </div>
}

export default Page