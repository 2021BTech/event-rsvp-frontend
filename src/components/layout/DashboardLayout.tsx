import type { ReactNode } from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Hidden on mobile, visible on md+ */}
      <div className="md:fixed md:inset-y-0 md:left-0 md:z-30 md:w-64">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {/* Main content wrapper */}
      <div className="flex flex-col flex-1 w-full md:pl-64">
        {/* Navbar */}
        <div className="fixed top-0 left-0 right-0 z-20 md:left-64">
          <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto mt-16 p-4 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
