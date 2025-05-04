import { redirect } from "next/navigation";

const page = async ({ params }: { params: { restaurantId: string } }) => {
  const { restaurantId } = await params;
  return redirect(`/dashboard/restaurant/${restaurantId}/orders`);
};

export default page;
