import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Menu } from "lucide-react";
import { useState } from "react";
import { UserMenu } from "@/components/UserMenu";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-card/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-hero p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              SocialBoost
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link to="/services" className="text-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <Link to="/pricing" className="text-foreground hover:text-primary transition-colors">
              Tarifs
            </Link>
            <Link to="/dashboard">
              <Button variant="outline">Tableau de bord</Button>
            </Link>
            <Link to="/order">
              <Button variant="hero">Commander</Button>
            </Link>
            <UserMenu />
          </div>

          <div className="md:hidden flex items-center gap-3">
            <UserMenu />
            <button
              className="bg-gradient-hero p-2 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6 text-primary-foreground" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link to="/services" className="text-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <Link to="/pricing" className="text-foreground hover:text-primary transition-colors">
              Tarifs
            </Link>
            <Link to="/dashboard">
              <Button variant="default" className="w-full">Tableau de bord</Button>
            </Link>
            <Link to="/order">
              <Button variant="hero" className="w-full">Commander</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
