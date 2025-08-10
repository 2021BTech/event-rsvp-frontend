import { FiMenu, FiLogOut } from "react-icons/fi";

type NavbarProps = {
  onToggleSidebar: () => void;
};

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const name: string = user?.name || "Admin";
  const initial = name.charAt(0).toUpperCase();

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/auth";
  };

  return (
    <header className="h-16 w-full fixed top-0 left-0 lg:pl-64 bg-white border-b shadow-sm flex items-center justify-between px-4 z-40">

      {/* Sidebar toggle (mobile only) */}
      <button
        className="lg:hidden text-gray-700 focus:outline-none"
        onClick={onToggleSidebar}
      >
        <FiMenu size={24} />
        
      </button>

      <div className="text-lg font-semibold p-4">Event RSVP Admin</div>

      <div className=" flex items-center gap-4 p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
            {initial}
          </div>
          <span className="text-sm text-gray-700 hidden md:inline">{name}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-red-600 hover:underline"
        >
          <FiLogOut className="text-base" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
