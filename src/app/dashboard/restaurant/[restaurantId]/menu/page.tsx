import { fetchMenus } from "@/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { CreateMenuModal } from "@/components/create-menu-modal";
import { MenuItemForm } from "@/components/menu-item-form"
import { MenuItemsList } from "@/components/menu-items-list"
import { Separator } from "@/components/ui/separator"
// import { Restaurant } from "@/components/restaurant";

const Page = async ({ params }: { params: { restaurantId: string } }) => {
  const { restaurantId } = await params;

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["restaurant-menu"],
    queryFn: () => fetchMenus(restaurantId),
  });
  const menus = await fetchMenus( restaurantId ) 

  if(!menus.length) return  <CreateMenuModal restaurantId={restaurantId} />

  return (
    <HydrationBoundary state={dehydrate(query)}>
      {/* <Restaurant restaurantId={restaurantId}/> */}
      <div className="grid gap-8 md:grid-cols-2">
      {/* <MenuItemForm menuId={menus[0]?.id} /> */}
      <MenuItemsList restaurantId={restaurantId} />
    </div>
    </HydrationBoundary>
  );
};

export default Page;
