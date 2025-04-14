// import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
// import {fetchMenus, fetchOrders, fetchRestaurantInfo} from "@/actions";
import Restaurant from "@/components/restaurant";
// import { getCurrentSession } from "@/lib/cookie";

const Page = async ({params} : {params : {restaurantId : string}}) => {
    const {restaurantId} = await params
    // const { user } = await getCurrentSession()

    // const restaurantId = user?.id || "";

    // const query = new QueryClient();

    // await query.prefetchQuery({
    //     queryKey : ["restaurant-info"],
    //     queryFn : () => fetchRestaurantInfo(restaurantId),
    // })

    // await query.prefetchQuery({
    //     queryKey : ["restaurant-menus"],
    //     queryFn : () => fetchMenus(restaurantId)
    // })

    // await query.prefetchQuery({
    //     queryKey : ["restaurant-orders"],
    //     queryFn : () => fetchOrders(restaurantId)
    // })

    // return <HydrationBoundary state={dehydrate(query)}>
    //     {/* <Restaurant restaurantId={restaurantId}/> */}
    //     <Restaurant params={restaurantId?}/>
    // </HydrationBoundary>
    return <Restaurant params={{ restaurantId }} />
}

export default Page