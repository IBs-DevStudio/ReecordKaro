"use client";

import { Navbar } from "@/components";
import { ReactNode } from "react";

// ✅ Type extracted (cleaner)
type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>

      {/* ✅ Optional Footer (easy future feature) */}
      <footer className="text-center text-sm text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} Reecord. All rights reserved.
      </footer>
    </div>
  );
};

export default RootLayout;