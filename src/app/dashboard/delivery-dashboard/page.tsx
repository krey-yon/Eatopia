import DeliveryDashboard from "@/components/rider-dashboard";
import { getCurrentSession } from "@/lib/cookie";

const page = async () => {
  const { user } = await getCurrentSession();
  
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  return <DeliveryDashboard riderId={user?.id!} riderName={user?.name!}  />;
};

export default page;
