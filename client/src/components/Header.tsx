import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAppAuth } from "@/contexts/AppProviders";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, User } from "lucide-react";
import { AppIcon } from "./icons/AppIcon";

export default function Header() {
  const { user, logout } = useAppAuth();
  const { cartCount, toggleCart } = useCart();
  const [_, setLocation] = useLocation();
  const [location] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/login");
  };

  // Determine active link
  const isActive = (path: string) => {
    return location === path ? "text-primary font-medium" : "text-foreground/70 hover:text-primary";
  };

  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Button variant="ghost" className="p-0 flex items-center space-x-2" onClick={() => setLocation("/dashboard")}>
              <AppIcon className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary dark:from-white dark:to-white bg-clip-text text-transparent">
                FlowEase
              </span>
            </Button>
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-6 mr-4">
              <Button 
                variant="ghost" 
                className={`transition-colors ${isActive("/dashboard")}`}
                onClick={() => setLocation("/dashboard")}
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className={`transition-colors ${isActive("/products")}`}
                onClick={() => setLocation("/products")}
              >
                Products
              </Button>
              <Button 
                variant="ghost" 
                className={`transition-colors ${isActive("/subscription")}`}
                onClick={() => setLocation("/subscription")}
              >
                Subscription
              </Button>
            </div>

            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <span className="text-foreground">{user?.firstName || "User"}</span>
                    <User className="h-5 w-5 text-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLocation("/profile")} className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation("/settings")} className="cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="ml-4 relative">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleCart}
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5 text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
