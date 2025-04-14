import { MenuItemFormSchema } from "@/lib/definitions";
import useZodForm2 from "./useZodForm2";
import { addMenuItems } from "@/app/dashboard/restaurant/action";

export function useAddMenuItem(){
    const { errors, onFormSubmit, register } = useZodForm2(MenuItemFormSchema, addMenuItems)    //fix it chrollo
    return { errors, onFormSubmit, register }
}
