import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {fetchMenus, fetchOrders, fetchRestaurantInfo} from "@/actions";

const Page = async ({params} : {params : {restaurantId : string}}) => {
    const {restaurantId} = await params

    const query = new QueryClient();

    await query.prefetchQuery({
        queryKey : ["restaurant-info"],
        queryFn : () => fetchRestaurantInfo(restaurantId),
    })

    await query.prefetchQuery({
        queryKey : ["restaurant-menus"],
        queryFn : () => fetchMenus(restaurantId)
    })

    await query.prefetchQuery({
        queryKey : ["restaurant-orders"],
        queryFn : () => fetchOrders(restaurantId)
    })

    return <HydrationBoundary state={dehydrate(query)}>

    </HydrationBoundary>
}

export default Page