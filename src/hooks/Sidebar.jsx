import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils"; // Optional utility for merging classNames

const links = [
  { path: "/", label: "Dashboard" },
  { path: "/scan", label: "Scan" },
  { path: "/weather", label: "Weather" },
  { path: "/community", label: "Community" },
  { path: "/reports", label: "Reports" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="w-full bg-white border-b lg:flex lg:items-center lg:justify-between px-4 py-3">
      {/* Brand + Hamburger */}
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          PlantIQ
        </Link>
        <button
          className="lg:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Links (shown always on large screens, toggled on mobile) */}
      <div
        className={cn(
          "lg:flex lg:space-x-6 mt-4 lg:mt-0",
          isOpen ? "block space-y-2" : "hidden"
        )}
      >
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "block text-sm font-medium text-muted-foreground hover:text-primary",
              location.pathname === link.path && "text-primary font-semibold"
            )}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
