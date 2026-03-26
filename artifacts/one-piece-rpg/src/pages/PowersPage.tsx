import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Zap, Shield, Sword, Crown, Flame, Sparkles } from "lucide-react";

const devilFruits = [
  {
    id: 1,
    name: "Gomu Gomu no Mi",
    type: "Paramecia",
    description: "Corpo de borracha, pode esticar como quiser",
    power: "Elasticidade extrema",
    rarity: "Lendário",
    icon: "🍐",
    color: "bg-red-600"
  },
  {
    id: 2,
    name: "Mera Mera no Mi",
    type: "Logia",
    description: "Controla água e pode se transformar em água",
    power: "Controle elemental da água",
    rarity: "Lendário",
    icon: "💧",
    color: "bg-blue-600"
  }
];

const hakiTypes = [
  {
    id: 1,
    name: "Haki do Armamento",
    description: "Endurece o corpo para ataques poderosos",
    type: "Haki Básico",
    mastery: "Iniciante",
    icon: "💪",
    color: "bg-gray-600"
  },
  {
    id: 2,
    name: "Haki da Observação",
    description: "Permite ver o fluxo de energia dos outros",
    type: "Haki Básico",
    mastery: "Iniciante",
    icon: "👁️",
    color: "bg-indigo-600"
  }
];

const specialAttacks = [
  {
    id: 1,
    name: "Gatling Gun",
    description: "Rajada rápida de tiros com ambas as mãos",
    damage: "Alto",
    type: "Técnica de Arma",
    icon: "🔫",
    color: "bg-red-600"
  },
  {
    id: 2,
    name: "Elephant Gun",
    description: "Tiro poderoso com impacto massivo",
    damage: "Extremo",
    type: "Técnica de Arma",
    icon: "🐘",
    color: "bg-orange-600"
  }
];

export default function PowersPage() {
  const [activeTab, setActiveTab] = useState("fruits");
  const [selectedPower, setSelectedPower] = useState<typeof devilFruits[0] | null>(null);
  const [learnedPowers, setLearnedPowers] = useState<any[]>([]);

  const learnPower = (power: any) => {
    if (!learnedPowers.find(p => p.id === power.id)) {
      setLearnedPowers([...learnedPowers, power]);
    }
  };

  const getPowerLevel = (power: any) => {
    if (power.rarity === "Lendário") return { level: 5, color: "text-yellow-400" };
    if (power.rarity === "Épico") return { level: 4, color: "text-purple-400" };
    if (power.mastery === "Mestre") return { level: 5, color: "text-yellow-400" };
    if (power.mastery === "Médio") return { level: 3, color: "text-blue-400" };
    return { level: 2, color: "text-green-400" };
  };

  const tabs = [
    { id: "fruits", label: "Akuma no Mi", icon: "🍎" },
    { id: "haki", label: "Haki", icon: "⚡" },
    { id: "attacks", label: "Técnicas", icon: "⚔️" }
  ];

  const getCurrentPowers = () => {
    switch(activeTab) {
      case "fruits": return devilFruits;
      case "haki": return hakiTypes;
      case "attacks": return specialAttacks;
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-red-500/20 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <span>🔥</span>
                  Poderes e Habilidades
                  <span>⚡</span>
                </h1>
                <div className="text-white/80">
                  Poderes Aprendidos: {learnedPowers.length}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-red-600 text-white shadow-lg shadow-red-600/25"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </motion.button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getCurrentPowers().map((power, index) => {
                  const powerLevel = getPowerLevel(power);
                  const isLearned = learnedPowers.find(p => p.id === power.id);
                  
                  return (
                    <motion.div
                      key={power.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03, y: -5 }}
                      className={`bg-slate-700/50 rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all ${
                        isLearned ? "ring-2 ring-green-500/50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{power.icon}</span>
                          <div>
                            <h3 className="text-white font-bold text-lg">{power.name}</h3>
                            <Badge className={`text-xs ${power.color}`}>
                              {power.type || power.rarity}
                            </Badge>
                            {isLearned && (
                              <Badge className="ml-2 bg-green-600">
                                Aprendido
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold text-lg ${powerLevel.color}`}>
                            Nível {powerLevel.level}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {power.damage || power.mastery || "Básico"}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mb-4">{power.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-400 text-xs">
                          {power.type ? `Tipo: ${power.type}` : `Dano: ${power.damage}`}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => learnPower(power)}
                          disabled={isLearned}
                          className={`${
                            isLearned 
                              ? "bg-green-600 hover:bg-green-700 text-white" 
                              : "bg-red-600 hover:bg-red-700 text-white"
                          }`}
                        >
                          {isLearned ? "Dominado" : "Aprender"}
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {learnedPowers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 bg-slate-700/50 rounded-xl p-6 border border-red-500/20"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Seus Poderes Dominados
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {learnedPowers.map((power, index) => (
                      <motion.div
                        key={power.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-lg p-4 border border-red-500/30"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{power.icon}</span>
                          <div>
                            <h4 className="text-white font-bold">{power.name}</h4>
                            <p className="text-gray-300 text-sm">{power.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
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