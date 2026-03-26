import { useState, useEffect, useRef } from "react";
import { useGetCharacter, useSaveCharacter, type CharacterInput, type InventoryItem } from "@workspace/api-client-react";
import { useDebounceCallback } from "usehooks-ts";
import { IdentitySection } from "@/components/character/IdentitySection";
import { XPSection } from "@/components/character/XPSection";
import { AttributesSection } from "@/components/character/AttributesSection";
import { CombatSection } from "@/components/character/CombatSection";
import { LogbookSection } from "@/components/character/LogbookSection";
import { XPLogSection } from "@/components/character/XPLogSection";
import { InventorySection } from "@/components/character/InventorySection";
import { DICE_COSTS, SPECIALTY_STARTER_KITS, type AttributeKey } from "@/lib/game-data";
import { generateId } from "@/lib/utils";
import { Loader2, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const defaultChar: CharacterInput = {
  playerName: "",
  pirateName: "",
  origin: "",
  specialty: "",
  vigor: { value: 0, dicePool: { d4: 0, d6: 0, d10: 0, d20: 0 } },
  agility: { value: 0, dicePool: { d4: 0, d6: 0, d10: 0, d20: 0 } },
  cunning: { value: 0, dicePool: { d4: 0, d6: 0, d10: 0, d20: 0 } },
  charisma: { value: 0, dicePool: { d4: 0, d6: 0, d10: 0, d20: 0 } },
  spirit: { value: 0, dicePool: { d4: 0, d6: 0, d10: 0, d20: 0 } },
  maxHp: 10,
  currentHp: 10,
  berries: 0,
  xpTotal: 0,
  logbook: "",
  xpLog: [],
  inventory: [],
  specialtyKit: [],
  devilFruit: null,
  hakiTypes: [],
  ship: null,
  background: "",
  goals: "",
  allies: "",
  enemies: "",
  equipment: "",
  treasures: "",
  notes: "",
};

export default function CharacterSheet() {
  const [character, setCharacter] = useState<CharacterInput>(defaultChar);
  const [activeTab, setActiveTab] = useState("identity");
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const { data: serverCharacter, isLoading: isLoadingCharacter } = useGetCharacter();
  const saveCharacter = useSaveCharacter();

  useEffect(() => {
    if (serverCharacter) {
      setCharacter(serverCharacter);
      setLastSaved(new Date());
    }
  }, [serverCharacter]);

  const debouncedSave = useDebounceCallback(async (char: CharacterInput) => {
    setIsLoading(true);
    setSaveStatus("Salvando...");
    
    try {
      await saveCharacter.mutateAsync(char);
      setSaveStatus("Salvo!");
      setLastSaved(new Date());
      
      setTimeout(() => {
        setSaveStatus("");
      }, 2000);
    } catch (error) {
      setSaveStatus("Erro ao salvar!");
      setTimeout(() => {
        setSaveStatus("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  }, 1000);

  const updateCharacter = (updates: Partial<CharacterInput>) => {
    const newCharacter = { ...character, ...updates };
    setCharacter(newCharacter);
    debouncedSave(newCharacter);
  };

  const tabs = [
    { id: "identity", label: "Identidade", icon: "👤" },
    { id: "attributes", label: "Atributos", icon: "⚔️" },
    { id: "combat", label: "Combate", icon: "⚡" },
    { id: "xp", label: "Experiência", icon: "⭐" },
    { id: "inventory", label: "Inventário", icon: "🎒" },
    { id: "logbook", label: "Diário", icon: "📖" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <span>⚓️</span>
                  Ficha de Personagem
                  <span>🏴‍☠️</span>
                </h1>
                <div className="flex items-center gap-4">
                  {saveStatus && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-white text-sm font-medium"
                    >
                      {saveStatus}
                    </motion.div>
                  )}
                  {lastSaved && (
                    <div className="text-white/80 text-xs">
                      Salvo: {lastSaved.toLocaleTimeString()}
                    </div>
                  )}
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
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "identity" && (
                    <IdentitySection
                      character={character}
                      updateCharacter={updateCharacter}
                    />
                  )}
                  {activeTab === "attributes" && (
                    <AttributesSection
                      character={character}
                      updateCharacter={updateCharacter}
                    />
                  )}
                  {activeTab === "combat" && (
                    <CombatSection
                      character={character}
                      updateCharacter={updateCharacter}
                    />
                  )}
                  {activeTab === "xp" && (
                    <XPSection
                      character={character}
                      updateCharacter={updateCharacter}
                    />
                  )}
                  {activeTab === "inventory" && (
                    <InventorySection
                      character={character}
                      updateCharacter={updateCharacter}
                    />
                  )}
                  {activeTab === "logbook" && (
                    <LogbookSection
                      character={character}
                      updateCharacter={updateCharacter}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}