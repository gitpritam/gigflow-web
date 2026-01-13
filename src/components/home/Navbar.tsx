import React from "react";
import {
  Zap,
  Menu,
  LayoutDashboard,
  User,
  LogOut,
  ChevronDown,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router";
import MobileMenu from "./MobileMenu";
import { useAuthStore } from "@/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/utils/apiRequest";
import { useNotifications } from "@/hook/useNotifications.hook";

// Simple time ago formatter
const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  return new Date(date).toLocaleDateString();
};

interface NavbarProps {
  isLoggedIn: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications(isLoggedIn ? user?._id : undefined);

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/auth/logout");
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Logout anyway on client side
      logout();
      navigate("/");
    }
  };

  const handleNotificationClick = (
    notificationId: string | undefined,
    data?: {
      bidId?: string;
      gigId?: string;
      [key: string]: unknown;
    }
  ) => {
    if (notificationId) {
      markAsRead(notificationId);
    }

    // Navigate based on notification data
    if (data?.bidId && data?.gigId) {
      navigate(`/gigs/${data.gigId}/bids`);
    } else if (data?.gigId) {
      navigate(`/gigs/${data.gigId}`);
    }
  };
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-brand-icon rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient-brand">
                GigFlow
              </span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                to="/gigs"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Browse Gigs
              </Link>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                How It Works
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/signin">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline">Register</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/gigs/add">
                  <Button variant="outline">Post a Gig</Button>
                </Link>
                <Link to="/dashboard">
                  <Button className="btn-gradient-primary">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>

                {/* Notification Bell */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="w-5 h-5 text-gray-700" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-500">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-80 max-h-96 overflow-y-auto"
                  >
                    <div className="flex items-center justify-between px-4 py-2 border-b">
                      <DropdownMenuLabel className="p-0">
                        Notifications
                      </DropdownMenuLabel>
                      {unreadCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllAsRead}
                          className="h-auto p-1 text-xs text-blue-600 hover:text-blue-700"
                        >
                          Mark all read
                        </Button>
                      )}
                    </div>
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                        No notifications yet
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <DropdownMenuItem
                          key={
                            notification._id ||
                            notification.timestamp.toString()
                          }
                          className={`cursor-pointer px-4 py-3 focus:bg-gray-50 ${
                            !notification.read ? "bg-blue-50" : ""
                          }`}
                          onClick={() =>
                            handleNotificationClick(
                              notification._id,
                              notification.data
                            )
                          }
                        >
                          <div className="flex flex-col gap-1 w-full">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500">
                              {timeAgo(
                                notification.createdAt || notification.timestamp
                              )}
                            </p>
                          </div>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-brand-icon rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-700">
                        {user?.name}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-blue-50"
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </Button>
              </SheetTrigger>
              <MobileMenu
                isLoggedIn={isLoggedIn}
                setMobileMenuOpen={setMobileMenuOpen}
              />
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
