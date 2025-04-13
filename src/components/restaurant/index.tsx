"use client"

import {useQueryData} from "@/hooks/useQueryData";
import {fetchRestaurantInfo} from "@/actions";
import {RestaurantInfoProps} from "@/lib/definitions";

const Restaurant = ({restaurantId} : {restaurantId : string})  => {

    const {data, isFetching} = useQueryData(["restaurant-info"], () => fetchRestaurantInfo(restaurantId))

    const restaurantInfo = data as RestaurantInfoProps;

    return <div>
        <p>
            {
                restaurantInfo.name
            }
        </p>
        <p>
            {
                restaurantInfo.address
            }
        </p>
    </div>
}

export default Restaurant