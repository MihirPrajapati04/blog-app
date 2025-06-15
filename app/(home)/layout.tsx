import React from "react";
import { Navbar } from "@/components/home/header/navbar";
import { AuthLoader } from "@/components/home/auth-loader";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* This is a separate server component where Prisma can be used */}
      <AuthLoader />
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
