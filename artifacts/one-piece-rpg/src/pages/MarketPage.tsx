import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ShoppingCart, Search, Filter, Coins } from "lucide-react";

const marketItems = [
  {
    id: 1,
    name: "Espada de Aço",
    category: "Armas",
    price: 5000,
    description: "Espada afiada de alta qualidade",
    rarity: "Comum",
    icon: "⚔️"
  },
  {
    id: 2,
    name: "Pistola Flínt",
    category: "Armas de Fogo",
    price: 8000,
    description: "Pistola confiável para combate",
    rarity: "Incomum",
    icon: "🔫"
  },
  {
    id: 3,
    name: "Mapa do Tesouro",
    category: "Itens Especiais",
    price: 15000,
    description: "Mapa antigo que leva a um tesouro",
    rarity: "Raro",
    icon: "🗺️"
  },
  {
    id: 4,
    name: "Bússola Mágica",
    category: "Instrumentos de Navegação",
    price: 12000,
    description: "Bússola que sempre aponta para o norte",
    rarity: "Incomum",
    icon: "🧭"
  },
  {
    id: 5,
    name: "Rum Extraforte",
    category: "Consumíveis",
    price: 500,
    description: "Rum que dá energia extra",
    rarity: "Comum",
    icon: "🍶"
  }
];

const categories = ["Todos", "Armas", "Armas de Fogo", "Consumíveis", "Itens Especiais", "Instrumentos de Navegação"];

export default function MarketPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cart, setCart] = useState<typeof marketItems>([]);

  const filteredItems = marketItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: typeof marketItems[0]) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case "Comum": return "bg-gray-600";
      case "Incomum": return "bg-green-600";
      case "Raro": return "bg-blue-600";
      case "Épico": return "bg-purple-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <span>🛒</span>
                  Mercado Pirata
                  <span>💰</span>
                </h1>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6 text-white" />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </div>
                  <div className="text-white font-bold">
                    {getTotalPrice().toLocaleString()} Berries
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-6 mb-6">
                <div className="flex-1">
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Buscar itens..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedCategory === category
                            ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        }`}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="lg:w-80">
                  <div className="bg-slate-700/50 rounded-lg p-4 border border-purple-500/20">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Carrinho ({cart.length})
                    </h3>
                    {cart.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">Seu carrinho está vazio</p>
                    ) : (
                      <div className="space-y-3">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between bg-slate-600/50 rounded-lg p-3">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{item.icon}</span>
                              <div>
                                <h4 className="text-white font-medium">{item.name}</h4>
                                <p className="text-gray-400 text-sm">{item.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-purple-400 font-bold">{item.price.toLocaleString()}</div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                              >
                                Remover
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="border-t border-slate-600 pt-4 mt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-bold text-lg">Total:</span>
                            <span className="text-purple-400 font-bold text-lg">{getTotalPrice().toLocaleString()} Berries</span>
                          </div>
                          <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white">
                            Finalizar Compra
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="bg-slate-700/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <h3 className="text-white font-bold text-lg">{item.name}</h3>
                          <Badge className={`text-xs ${getRarityColor(item.rarity)}`}>
                            {item.rarity}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-purple-400 font-bold text-lg">{item.price.toLocaleString()}</div>
                        <div className="text-gray-400 text-sm">Berries</div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">Categoria: {item.category}</span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(item)}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        disabled={cart.some(cartItem => cartItem.id === item.id)}
                      >
                        {cart.some(cartItem => cartItem.id === item.id) ? "No Carrinho" : "Adicionar"}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}