// "use client";

// import { useQueryData } from "@/hooks/useQueryData";
// import { fetchRestaurantInfo } from "@/actions";
// import { RestaurantInfoProps } from "@/lib/definitions";

// const Restaurant = ({ restaurantId }: { restaurantId: string }) => {
//   const { data, isFetching } = useQueryData(["restaurant-info"], () =>
//     fetchRestaurantInfo(restaurantId)
//   );

//   const restaurantInfo = data as RestaurantInfoProps;

//   return (
//     <div>
//       <p>{restaurantInfo.name}</p>
//       <p>{restaurantInfo.address}</p>
//     </div>
//   );
// };

// export default Restaurant;


import { Suspense } from "react"
import { MenuItemForm } from "@/components/menu-item-form"
import { MenuItemsList } from "@/components/menu-items-list"
import { CreateMenuModal } from "@/components/create-menu-modal"
import { Separator } from "@/components/ui/separator"
import { getRestaurantMenu } from "@/app/dashboard/restaurant/action"
// import { getRestaurantMenu } from "@/lib/menu"

export default function MenuPage({ params }: { params: { restaurantId: string } }) {
  const restaurantId = params.restaurantId

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <p className="text-muted-foreground">Add and manage menu items for your restaurant</p>
      </div>
      <Separator />
      <Suspense fallback={<div>Loading menu...</div>}>
        <MenuContent restaurantId={restaurantId} />
      </Suspense>
    </div>
  )
}

async function MenuContent({ restaurantId }: { restaurantId: string }) {
  // const menu = await getRestaurantMenu(restaurantId)
  const menu = await getRestaurantMenu(restaurantId)

  if (!menu) {
    return <CreateMenuModal restaurantId={restaurantId} />
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <MenuItemForm menuId={menu.id} />
      <MenuItemsList menuId={menu.id} />
    </div>
  )
}
