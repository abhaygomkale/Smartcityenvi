import { Bell, User, ChevronDown, Settings, LogOut, UserCircle, Radio, Database } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

interface TopNavProps {
  onLogout?: () => void;
}

export function TopNav({ onLogout }: TopNavProps) {
  const navigate = useNavigate();
  const { useRealTimeData, toggleDataSource, username } = useAppContext();

  return (
    <div className="h-16 border-b border-slate-200 bg-white/95 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl text-slate-900">Nagpur Digital Twin</h1>
          <p className="text-sm text-slate-600">CO₂ Monitoring & Analytics Platform</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Compact Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-600">Online</span>
        </div>

        {/* Data Source Toggle - Compact */}
        <div className="px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
          {useRealTimeData ? (
            <Radio className="h-3.5 w-3.5 text-green-500 animate-pulse" />
          ) : (
            <Database className="h-3.5 w-3.5 text-blue-500" />
          )}
          <span className="text-xs text-slate-600">
            {useRealTimeData ? "Live" : "Demo"}
          </span>
          <Switch 
            checked={useRealTimeData} 
            onCheckedChange={toggleDataSource}
            className="scale-75"
          />
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 h-9 w-9">
              <Bell className="h-4 w-4 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-y-auto">
              <div className="p-3 hover:bg-slate-50 cursor-pointer border-l-2 border-red-500">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">Critical Alert: Sitabuldi</p>
                    <p className="text-xs text-slate-600 mt-1">CO₂ levels exceeding 1200 ppm</p>
                    <p className="text-xs text-slate-400 mt-1">5 min ago</p>
                  </div>
                </div>
              </div>
              <div className="p-3 hover:bg-slate-50 cursor-pointer border-l-2 border-amber-500">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">Warning: MIHAN Zone</p>
                    <p className="text-xs text-slate-600 mt-1">Industrial emissions spike detected</p>
                    <p className="text-xs text-slate-400 mt-1">12 min ago</p>
                  </div>
                </div>
              </div>
              <div className="p-3 hover:bg-slate-50 cursor-pointer border-l-2 border-green-500">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">Success: Weekly Target</p>
                    <p className="text-xs text-slate-600 mt-1">Achieved 8.5% emission reduction</p>
                    <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                View All Notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Dropdown - Compact */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 hover:bg-slate-100 h-auto py-1.5 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-blue-700 to-blue-500">
                  <User className="h-4 w-4 text-white" />
                </AvatarFallback>
              </Avatar>
              <Link to="/profile">
                <div className="text-left hidden md:block">
                  <p className="text-xs text-slate-900">{username}</p>
                  <p className="text-[10px] text-slate-600">Admin</p>
                </div>
              </Link>
              <ChevronDown className="h-3 w-3 text-slate-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
              <UserCircle className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-red-600 focus:text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
