import React from "react";
import { Zap, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetContent } from "@/components/ui/sheet";
import { Link } from "react-router";

interface MobileMenuProps {
  isLoggedIn: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isLoggedIn,
  setMobileMenuOpen,
}) => {
  return (
    <SheetContent className="w-full sm:w-96">
      <div className="flex flex-col h-full">
        {/* Mobile Menu Header */}
        <div className="p-6 border-b bg-gradient-brand-light">
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 bg-gradient-brand-icon rounded-lg flex items-center justify-center shadow-md">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient-brand">
              GigFlow
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-1 p-4">
          <Link
            to="/gigs"
            className="text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all"
            onClick={() => setMobileMenuOpen(false)}
          >
            Browse Gigs
          </Link>
          <a
            href="#how-it-works"
            className="text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all"
            onClick={() => setMobileMenuOpen(false)}
          >
            How It Works
          </a>
          {isLoggedIn ? (
            <>
              <Link
                to="/gigs/add"
                className="text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Post a Gig
              </Link>
              <Link
                to="/dashboard"
                className="text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </>
          ) : (
            <Link
              to="/signin"
              className="text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mx-4"></div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3 p-4 mt-auto">
          {!isLoggedIn ? (
            <>
              <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full h-11 text-base font-medium border-gray-300 hover:bg-gray-50"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full h-11 text-base font-medium border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/gigs/add" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full h-11 text-base font-medium"
                >
                  Post a Gig
                </Button>
              </Link>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full h-11 text-base font-medium btn-gradient-primary text-white shadow-md">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </SheetContent>
  );
};

export default MobileMenu;
