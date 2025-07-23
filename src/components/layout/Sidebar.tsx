import { Link, useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";
import { MdDashboard, MdPeople, MdEvent } from "react-icons/md";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { pathname } = useLocation();

  const links = [
    { label: "Dashboard", to: "/dashboard", icon: <MdDashboard size={20} /> },
    { label: "Users", to: "/users", icon: <MdPeople size={20} /> },
    { label: "Events", to: "/events", icon: <MdEvent size={20} /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static"
        )}
      >
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Event Admin Panel
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {links.map(({ label, to, icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition",
                pathname === to && "bg-gray-700"
              )}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
