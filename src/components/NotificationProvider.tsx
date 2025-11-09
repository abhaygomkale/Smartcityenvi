import { createContext, useContext, useState, ReactNode } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { Card } from "./ui/card";

interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
}

interface NotificationContextType {
  showNotification: (type: Notification["type"], title: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (type: Notification["type"], title: string, message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { id, type, title, message };
    
    setNotifications((prev) => [...prev, newNotification]);
    
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-[#10b981]" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-[#ef4444]" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-[#f59e0b]" />;
      case "info":
        return <Info className="h-5 w-5 text-[#3b82f6]" />;
    }
  };

  const getColors = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "from-[#f0fdf4] to-[#dcfce7] border-[#10b981]/30";
      case "error":
        return "from-[#fef2f2] to-[#fee2e2] border-[#ef4444]/30";
      case "warning":
        return "from-[#fff7ed] to-[#ffedd5] border-[#f59e0b]/30";
      case "info":
        return "from-[#eff6ff] to-[#dbeafe] border-[#3b82f6]/30";
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      
      {/* Notification Stack */}
      <div className="fixed top-20 right-6 z-[100] space-y-3 max-w-md">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-4 shadow-2xl animate-in slide-in-from-right duration-300 border-2 bg-gradient-to-r ${getColors(notification.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getIcon(notification.type)}</div>
              <div className="flex-1">
                <h4 className="text-sm mb-1">{notification.title}</h4>
                <p className="text-sm text-[#64748b]">{notification.message}</p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-[#64748b] hover:text-[#0f172a] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
}
