import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Train, User, Bell, MessageSquare } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Train className="h-8 w-8 text-primary-foreground" />
            <span className="text-xl font-bold text-primary-foreground">KAI Book</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/">
              <Button
                variant={isActive("/") ? "secondary" : "ghost"}
                className={!isActive("/") ? "text-primary-foreground hover:bg-primary/80" : ""}
              >
                Search Trains
              </Button>
            </Link>
            <Link to="/my-orders">
              <Button
                variant={isActive("/my-orders") ? "secondary" : "ghost"}
                className={!isActive("/my-orders") ? "text-primary-foreground hover:bg-primary/80" : ""}
              >
                My Orders
              </Button>
            </Link>
            <Link to="/delays">
              <Button
                variant={isActive("/delays") ? "secondary" : "ghost"}
                className={!isActive("/delays") ? "text-primary-foreground hover:bg-primary/80" : ""}
              >
                <Bell className="h-4 w-4" />
                Delays
              </Button>
            </Link>
            <Link to="/community">
              <Button
                variant={isActive("/community") ? "secondary" : "ghost"}
                className={!isActive("/community") ? "text-primary-foreground hover:bg-primary/80" : ""}
              >
                <MessageSquare className="h-4 w-4" />
                Community
              </Button>
            </Link>
          </div>

          <Button variant="secondary" size="sm">
            <User className="h-4 w-4" />
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
