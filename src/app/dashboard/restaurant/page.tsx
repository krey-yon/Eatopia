import { getCurrentSession } from "@/lib/cookie"
import { redirect } from "next/navigation";
import { getRestaurant } from "./action";
import CreateRestaurant from "@/components/create-restaurant";


const RestaurantDashboard = async () => {
    const { user } = await getCurrentSession();

    if(user?.role !== "RESTAURANT") redirect("/dashboard")
    
    const findRestaurant = await getRestaurant(user.id!)

    if(!findRestaurant) return <CreateRestaurant />
    redirect(`/dashboard/restaurant/${findRestaurant.id}`)
}

export default RestaurantDashboard