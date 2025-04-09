"use client"
import { signup} from "@/app/(auth)/signup/actions";
import {useActionState} from "react";
import type { FormState } from "@/lib/definitions";

const initialState: FormState = {
    errors: {},
    message: undefined,
};

const Page = () => {

    const[state, action, pending] = useActionState(signup, initialState);

    return <form action={action}>
        <input type="text" name="name" placeholder="Name" className="input"/>
        <input type="email" name="email" placeholder="Email" className="input"/>
        <input type="password" name="password" placeholder="Password" className="input"/>
        <input type="text" name="address" placeholder="Address" className="input"/>
        <input type="text" name="role" placeholder="ROLE" className="input"/>

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