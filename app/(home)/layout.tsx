import React from "react";
import { Navbar } from "@/components/home/header/navbar";
import { AuthLoader } from "@/components/home/auth-loader";
import { Suspense } from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* This is a separate server component where Prisma can be used */}
      <AuthLoader />
      <Suspense fallback={<div>Loading navbar...</div>}>
        <Navbar />
      </Suspense>
      {children}
    </div>
  );
};

export default Layout;
