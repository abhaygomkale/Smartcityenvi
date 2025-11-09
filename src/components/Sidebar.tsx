import {
  Home,
  Map,
  BarChart3,
  Zap,
  AlertTriangle,
  FileText,
  Settings,
  User,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();

  const menuItems = [
    { id: "home", path: "/", label: "Dashboard", icon: Home, badge: null, color: "from-blue-500 to-cyan-500" },
    { id: "map", path: "/map", label: "City Map", icon: Map, badge: null, color: "from-green-500 to-emerald-500" },
    { id: "analytics", path: "/analytics", label: "Analytics", icon: BarChart3, badge: "New", color: "from-purple-500 to-pink-500" },
    { id: "simulation", path: "/simulation", label: "Simulation", icon: Zap, badge: null, color: "from-amber-500 to-orange-500" },
    { id: "alerts", path: "/alerts", label: "Alerts", icon: AlertTriangle, badge: "3", color: "from-red-500 to-rose-500" },
    { id: "reports", path: "/reports", label: "Reports", icon: FileText, badge: null, color: "from-teal-500 to-cyan-500" },
    { id: "profile", path: "/profile", label: "Profile", icon: User, badge: null, color: "from-indigo-500 to-purple-500" },
    { id: "settings", path: "/settings", label: "Settings", icon: Settings, badge: null, color: "from-slate-500 to-slate-600" },
  ];

  return (
    <div className="relative w-64 h-full bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
      {/* Menu Items */}
      <div className="flex-1 py-4 px-2 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const isHovered = hoveredItem === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <Link
                to={item.path}
                className={`
                  relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                  transition-all duration-200
                  ${isActive 
                    ? 'text-white' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }
                  ${!isActive && isHovered ? 'bg-slate-100 dark:bg-slate-900' : ''}
                `}
              >
                {/* Active background with gradient */}
                {isActive && (
                  <motion.div
                    layoutId="activeBackground"
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.color} shadow-lg`}
                    style={{
                      boxShadow: `0 4px 20px -4px ${item.color.split(' ')[1].replace('to-', '')}40`
                    }}
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Icon */}
                <div className="relative z-10 flex items-center justify-center">
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : ''}`} />
                </div>

                {/* Label and Badge */}
                <div className="relative z-10 flex items-center justify-between flex-1 min-w-0">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      className={`
                        ml-2 px-1.5 py-0.5 text-[10px]
                        ${isActive 
                          ? 'bg-white/20 text-white border-white/30' 
                          : 'bg-red-500 text-white'
                        }
                        ${item.id === 'alerts' && !isActive ? 'animate-pulse' : ''}
                      `}
                      variant={isActive ? "secondary" : "default"}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
    </div>
  );
}
