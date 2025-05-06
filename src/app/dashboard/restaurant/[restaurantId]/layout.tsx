"use Client";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import type React from "react";

type Params = Promise<{ restaurantId: string }>

const Layout = async ({
  params,
  children,
}: {
  children: React.ReactNode;
  params: Params;
}) => {
  const { restaurantId } = await params;

  return (
    <DashboardSidebar restaurantId={restaurantId}>{children}</DashboardSidebar>
  );
};

export default Layout;
