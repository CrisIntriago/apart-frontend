"use client";

import HeaderNavigation from "../HeaderNavigation";

const LayoutRegister = ({ children }: { children: React.ReactNode }) => {
  return (
      <div className="flex flex-col items-center min-h-screen bg-white font-sans">
        <HeaderNavigation />
        <div className="w-full border-b-2 border-black"></div>

        <div className="w-full flex justify-center mt-6 mb-4">
          <img src="/images/logo.jpg" alt="Logo" className="w-15 h-auto" />
        </div>

        <main className="w-full max-w-4xl px-6">{children}</main>
      </div>
  );
};

export default LayoutRegister;
