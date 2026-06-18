import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto">
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
