// src/components/Navigation.tsx

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ThemeToggle";
import { Calendar, Home, Menu, X } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Início", icon: Home, show: true },
    { href: "/agendamento", label: "Agendamento", icon: Calendar, show: true },
    { href: "/admin", label: "Admin", icon: Home, show: isAuthenticated && user?.role === 'admin' },
  ].filter(item => item.show);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/20"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-6 w-6 bg-primary rounded-lg group-hover:scale-110 transition-transform duration-200"></div>
            <span className="font-light text-xl text-foreground">
              DentCare Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />
            
            <div className="hidden md:flex items-center space-x-2">
              {isAuthenticated && user ? (
                <>
                  <span className="text-sm text-muted-foreground">Olá, {user.name.split(' ')[0]}</span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>Sair</Button>
                </>
              ) : (
                !isLoading && <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Admin</Button>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden h-8 w-8 p-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border/20">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  // CORREÇÃO: Placeholder removido e código correto inserido
                  className={cn(
                    "text-base font-medium transition-colors duration-200",
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border/20 flex flex-col space-y-2">
                {isAuthenticated && user ? (
                   <Button variant="ghost" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>Sair</Button>
                ) : (
                  !isLoading && <Button variant="ghost" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>Admin</Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}