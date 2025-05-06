import { getCurrentSession } from "@/lib/cookie";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const { user } = await getCurrentSession();

  if (!user) {
    redirect("/signin");
  }

  switch (user?.role) {
    case "USER":
      redirect("/dashboard/user");
      break;
    case "RIDER":
      redirect("/dashboard/delivery-dashboard");
      break;
    case "RESTAURANT":
      redirect("/dashboard/restaurant");
    default:
      break;
  }
};

export default Dashboard;
