"use client"
import {useActionState} from "react";
import type { FormState } from "@/lib/definitions";
import {signin} from "@/app/(auth)/signin/actions";

const initialState: FormState = {
    errors: {},
    message: undefined,
};

const Page = () => {

    const[state, action, pending] = useActionState(signin, initialState);

    return <form action={action}>
        <input type="email" name="email" placeholder="Email" className="input"/>
        <input type="password" name="password" placeholder="Password" className="input"/>
        <button disabled={pending} type="submit" className="btn">
            Sign Up
        </button>
        <p>
            {
                state?.message
            }
        </p>
    </form>
}

export default Page