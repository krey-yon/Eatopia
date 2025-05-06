import { redirect } from "next/navigation";

type Params = Promise<{ restaurantId: string }>

const page = async ({ params }: { params: Params }) => {
  const { restaurantId } = await params;
  return redirect(`/dashboard/restaurant/${restaurantId}/orders`);
};

export default page;
