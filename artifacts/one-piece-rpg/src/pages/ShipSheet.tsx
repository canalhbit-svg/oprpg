import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Ship, Anchor, Waves, Wind, Shield, Cannon } from "lucide-react";

const shipTypes = [
  {
    id: 1,
    name: "Caravela",
    category: "Navios Leves",
    price: 10000,
    description: "Navio rápido e ágil para exploração",
    capacity: 20,
    speed: 8,
    durability: 60,
    icon: "⛵"
  },
  {
    id: 2,
    name: "Galeão",
    category: "Navios Médios",
    price: 25000,
    description: "Navio equilibrado para combate e transporte",
    capacity: 50,
    speed: 6,
    durability: 100,
    icon: "🚢"
  },
  {
    id: 3,
    name: "Navio de Guerra",
    category: "Navios Pesados",
    price: 50000,
    description: "Poderoso navio de batalha com muitos canhões",
    capacity: 100,
    speed: 4,
    durability: 150,
    icon: "⚓️"
  },
  {
    id: 4,
    name: "Thousand Sunny",
    category: "Navios Especiais",
    price: 100000,
    description: "Navio lendário com capacidades especiais",
    capacity: 200,
    speed: 10,
    durability: 200,
    icon: "☀️"
  }
];

const shipUpgrades = [
  { id: 1, name: "Canhões Melhorados", price: 5000, description: "Aumenta o poder de fogo", icon: "💥" },
  { id: 2, name: "Blindagem Reforçada", price: 8000, description: "Melhora a defesa do navio", icon: "🛡️" },
  { id: 3, name: "Velas Mágicas", price: 12000, description: "Aumenta a velocidade", icon: "🌬️" },
  { id: 4, name: "Bússola de Poseidon", price: 15000, description: "Navegação perfeita em qualquer mar", icon: "🧭" }
];

export default function ShipSheet() {
  const [selectedShip, setSelectedShip] = useState<typeof shipTypes[0] | null>(null);
  const [upgrades, setUpgrades] = useState<typeof shipUpgrades>([]);
  const [crewCount, setCrewCount] = useState(0);
  const [shipName, setShipName] = useState("");

  const buyShip = (ship: typeof shipTypes[0]) => {
    setSelectedShip(ship);
    setCrewCount(Math.floor(ship.capacity * 0.8));
  };

  const buyUpgrade = (upgrade: typeof shipUpgrades[0]) => {
    if (!upgrades.find(u => u.id === upgrade.id)) {
      setUpgrades([...upgrades, upgrade]);
    }
  };

  const getTotalCost = () => {
    const shipCost = selectedShip ? selectedShip.price : 0;
    const upgradeCost = upgrades.reduce((total, upgrade) => total + upgrade.price, 0);
    return shipCost + upgradeCost;
  };

  const getShipStats = () => {
    if (!selectedShip) return null;
    
    const baseStats = {
      capacity: selectedShip.capacity,
      speed: selectedShip.speed,
      durability: selectedShip.durability
    };

    const upgradeBonus = upgrades.reduce((bonus, upgrade) => {
      switch(upgrade.id) {
        case 1: return { ...bonus, damage: (bonus.damage || 0) + 20 };
        case 2: return { ...bonus, defense: (bonus.defense || 0) + 30 };
        case 3: return { ...bonus, speed: (bonus.speed || 0) + 2 };
        case 4: return { ...bonus, navigation: true };
        default: return bonus;
      }
    }, {});

    return { ...baseStats, ...upgradeBonus };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-500/20 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <span>⚓️</span>
                  Ficha do Navio
                  <span>🌊</span>
                </h1>
                {selectedShip && (
                  <div className="text-white/80">
                    Tripulação: {crewCount}/{selectedShip.capacity}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Ship className="w-6 h-6" />
                    Navios Disponíveis
                  </h2>

                  <div className="space-y-4">
                    {shipTypes.map((ship, index) => (
                      <motion.div
                        key={ship.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        onClick={() => buyShip(ship)}
                        className={`bg-slate-700/50 rounded-xl p-6 border border-blue-500/20 cursor-pointer transition-all ${
                          selectedShip?.id === ship.id ? "ring-2 ring-blue-500/50" : "hover:border-blue-500/40"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{ship.icon}</span>
                            <div>
                              <h3 className="text-white font-bold text-lg">{ship.name}</h3>
                              <Badge className="text-xs bg-blue-600">
                                {ship.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-cyan-400 font-bold text-lg">{ship.price.toLocaleString()}</div>
                            <div className="text-gray-400 text-sm">Berries</div>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mb-4">{ship.description}</p>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-gray-400 text-xs">Capacidade</div>
                            <div className="text-white font-bold">{ship.capacity}</div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-xs">Velocidade</div>
                            <div className="text-white font-bold">{ship.speed}</div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-xs">Durabilidade</div>
                            <div className="text-white font-bold">{ship.durability}</div>
                          </div>
                        </div>
                        <Button 
                          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                          disabled={selectedShip?.id === ship.id}
                        >
                          {selectedShip?.id === ship.id ? "Selecionado" : "Comprar"}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    Melhorias
                  </h2>

                  <div className="space-y-4">
                    {shipUpgrades.map((upgrade, index) => (
                      <motion.div
                        key={upgrade.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -3 }}
                        className={`bg-slate-700/50 rounded-xl p-4 border border-blue-500/20 ${
                          upgrades.find(u => u.id === upgrade.id) ? "ring-2 ring-cyan-500/50" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{upgrade.icon}</span>
                            <div>
                              <h3 className="text-white font-bold">{upgrade.name}</h3>
                              <p className="text-gray-400 text-sm">{upgrade.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-cyan-400 font-bold">{upgrade.price.toLocaleString()}</div>
                            <div className="text-gray-400 text-sm">Berries</div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => buyUpgrade(upgrade)}
                          disabled={!selectedShip || upgrades.find(u => u.id === upgrade.id)}
                          className="bg-cyan-600 hover:bg-cyan-700 text-white"
                        >
                          {upgrades.find(u => u.id === upgrade.id) ? "Comprado" : "Comprar"}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {selectedShip && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 bg-slate-700/50 rounded-xl p-6 border border-blue-500/20"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Anchor className="w-5 h-5" />
                    {shipName || selectedShip.name}
                  </h3>
                  
                  <div className="mb-4">
                    <Label className="text-white">Nome do Navio</Label>
                    <Input
                      value={shipName}
                      onChange={(e) => setShipName(e.target.value)}
                      placeholder="Dê um nome ao seu navio..."
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-gray-400 text-sm">Capacidade</div>
                      <div className="text-2xl font-bold text-blue-400">{getShipStats()?.capacity}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-sm">Velocidade</div>
                      <div className="text-2xl font-bold text-green-400">{getShipStats()?.speed}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-sm">Durabilidade</div>
                      <div className="text-2xl font-bold text-orange-400">{getShipStats()?.durability}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-sm">Tripulação</div>
                      <div className="text-2xl font-bold text-purple-400">{crewCount}</div>
                    </div>
                  </div>

                  <div className="border-t border-slate-600 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold text-lg">Custo Total:</span>
                      <span className="text-cyan-400 font-bold text-lg">{getTotalCost().toLocaleString()} Berries</span>
                    </div>
                    <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                      Comprar Navio e Melhorias
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}