import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import CharacterSheet from "@/pages/CharacterSheet";
import ShipSheet from "@/pages/ShipSheet";
import MarketPage from "@/pages/MarketPage";
import PowersPage from "@/pages/PowersPage";
import LoginPage from "@/pages/LoginPage";
import MasterPanel from "@/pages/MasterPanel";
import NotFound from "@/pages/not-found";
import { ScrollText, Ship as ShipIcon, ShoppingBag, Flame, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const queryClient = new QueryClient();

function Navigation({ user, isMaster, onLogout }: { user: any; isMaster: boolean; onLogout: () => void }) {
  const [location] = useLocation();

  if (isMaster) {
    return null; // MasterPanel has its own navigation
  }

  const tabs = [
    { href: "/", label: "PERSONAGEM", icon: ScrollText },
    { href: "/ship", label: "O NAVIO", icon: ShipIcon },
    { href: "/market", label: "MERCADO", icon: ShoppingBag },
    { href: "/powers", label: "PODERES", icon: Flame },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border shadow-xl shadow-black/50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}images/skull-logo.png`} alt="Jolly Roger" className="w-10 h-10 object-contain drop-shadow-md" />
          <h1 className="font-display font-bold text-xl tracking-widest text-primary text-glow hidden sm:block">ONE PIECE RPG</h1>
        </div>
        <div className="flex items-center space-x-1">
          {tabs.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}>
              <button className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all",
                location === href
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}>
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            </Link>
          ))}
          <Button onClick={onLogout} variant="ghost" size="sm" className="ml-2">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

function Router() {
  const [user, setUser] = useState<any>(null);
  const [isMaster, setIsMaster] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsMaster(user?.email === 'canalhbit@gmail.com');
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleLogin = (loggedInUser: any, master: boolean) => {
    setUser(loggedInUser);
    setIsMaster(master);
  };

  const handleLogout = async () => {
    setUser(null);
    setIsMaster(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (isMaster) {
    return <MasterPanel user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen relative font-sans">
      <img
        src={`${import.meta.env.BASE_URL}images/bg-texture.png`}
        alt="Background texture"
        className="fixed inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0 mix-blend-overlay"
      />

      <Navigation user={user} isMaster={isMaster} onLogout={handleLogout} />

      <main className="relative z-10 p-4 sm:p-6 lg:p-8">
        <Switch>
          <Route path="/" component={CharacterSheet} />
          <Route path="/ship" component={ShipSheet} />
          <Route path="/market" component={MarketPage} />
          <Route path="/powers" component={PowersPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
