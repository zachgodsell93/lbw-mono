import React from "react";
import { AuthProvider } from "../../providers/auth-provider";
import Sidebar from "@/components/shared/sidebar";
import Header from "@/components/shared/header";
import { UserProvider } from "@/providers/user-provider";
import { UpcomingRacesProvider } from "@/providers/upcoming-races-provider";
import { Toaster } from "@/components/ui/toaster";
import { TrendProvider } from "@/providers/trend-provider";
import { Metadata } from "next";
import { LayOnlyProvider } from "@/providers/lay-only";

export const metadata: Metadata = {
  title: "Dashboard | Lay Back and Win",
  description: "Lay Back and Win horse form ratings.",
};
type Props = {
  children?: React.ReactNode;
  params?: any;
};

export default function Layout({ children, params }: Props) {
  return (
    <div>
      <AuthProvider>
        <UserProvider>
          <UpcomingRacesProvider>
            <TrendProvider>
              <LayOnlyProvider>
                <div className="flex min-h-screen w-full lg:grid-cols-1">
                  <Sidebar />
                  <div className="flex flex-col w-full ml-[0px] lg:ml-[280px]">
                    <Header />
                    <div className="mt-16 w-full">
                      {children}
                      <Toaster />
                    </div>
                  </div>
                </div>
              </LayOnlyProvider>
            </TrendProvider>
          </UpcomingRacesProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}
