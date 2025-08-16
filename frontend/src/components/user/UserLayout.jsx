import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header";
import UserSidebar from "./UserSidebar";

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 768);
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header onToggleSidebar={() => setIsSidebarOpen((p) => !p)} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <UserSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Content */}
        <div
          className={`flex-1 overflow-auto min-h-0 transition-all duration-300 
            ${isSidebarOpen ? "ml-60" : "pt-10 ml-0"} 
            md:ml-0`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
