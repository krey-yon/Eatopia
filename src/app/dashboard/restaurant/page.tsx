import { getCurrentSession } from "@/lib/cookie"
import { redirect } from "next/navigation";
import { getRestaurant } from "./action";
import CreateRestaurant from "@/components/create-restaurant";


// const RestaurantDashboard = async () => {
//     const { user } = await getCurrentSession();

//     if(user?.role !== "RESTAURANT") redirect("/dashboard")
    
//     const findRestaurant = await getRestaurant(user.id!)

//     if(!findRestaurant) return <CreateRestaurant />
//     redirect(`/dashboard/restaurant/${findRestaurant.id}`)
// }

// export default RestaurantDashboard

// This is a mock function to get the restaurant ID
// In a real app, you would get this from authentication or context


export default async function DashboardPage() {

    const {user} = await getCurrentSession();
    if (!user) redirect("/signin");
    const findRestaurant = await getRestaurant(user.id);

    if (user?.role !== "RESTAURANT") redirect("/dashboard")
    if (!findRestaurant) return <CreateRestaurant/>

    redirect(`/dashboard/restaurant/${findRestaurant.id}`)
}
