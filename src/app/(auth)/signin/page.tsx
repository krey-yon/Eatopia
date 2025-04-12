"use client"
import {useActionState, useEffect} from "react";
import type { FormState } from "@/lib/definitions";
import {signin} from "@/app/(auth)/signin/actions";
import {useRouter} from "next/navigation";

const initialState: FormState = {
    errors: {},
    message: undefined,
};

const Page = () => {

    const[state, action, pending] = useActionState(signin, initialState);

    const router = useRouter();

    useEffect(() => {
        if (state.message === "signin successful") {
            router.push("/dashboard");
        }
    }, [state.message, router]);

    return <form action={action}>
        <input type="email" name="email" placeholder="Email" className="input"/>
        <input type="password" name="password" placeholder="Password" className="input"/>
        <button disabled={pending} type="submit" className="btn">
            Sign Up
        </button>
    </form>
}

export default Page