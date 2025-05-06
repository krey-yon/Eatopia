import DeliveryDashboard from '@/components/rider-dashboard';
import { getCurrentSession } from '@/lib/cookie';

const page = async () => {
    const { user } = await getCurrentSession();

  return <DeliveryDashboard riderId={user?.id!} />
}

export default page