import { OrdersDisplay } from "@/components/orders-display";
import React from "react";

type Params = Promise<{ restaurantId: string }>

const page = async ({ params }: { params: Params }) => {
  const { restaurantId } = await params;
  return (
    <div>
      <OrdersDisplay restaurantId={restaurantId} />
    </div>
  );
};

export default page;
