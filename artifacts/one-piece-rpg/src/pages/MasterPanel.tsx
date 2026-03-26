import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollText, Users, Settings, Crown, Skull } from 'lucide-react';
import { logout } from '@/lib/firebase';

interface MasterPanelProps {
  user: any;
  onLogout: () => void;
}

export default function MasterPanel({ user, onLogout }: MasterPanelProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  return (
    <div className="min-h-screen relative font-sans">
      <img
        src={`${import.meta.env.BASE_URL}images/bg-texture.png`}
        alt="Background texture"
        className="fixed inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0 mix-blend-overlay"
      />

      <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border shadow-xl shadow-black/50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl tracking-widest text-primary text-glow">
                PAINEL DO MESTRE
              </h1>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            Sair
          </Button>
        </div>
      </nav>

      <main className="relative z-10 p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="players" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Jogadores
              </TabsTrigger>
              <TabsTrigger value="campaign" className="flex items-center gap-2">
                <ScrollText className="w-4 h-4" />
                Campanha
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Configurações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="backdrop-blur-md bg-background/80 border-border shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Jogadores Ativos</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">Jogadores na sessão</p>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-md bg-background/80 border-border shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sessão Atual</CardTitle>
                    <Skull className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Capítulo 1</div>
                    <p className="text-xs text-muted-foreground">Início da jornada</p>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-md bg-background/80 border-border shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Status</CardTitle>
                    <Badge variant="default">Online</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">Ativo</div>
                    <p className="text-xs text-muted-foreground">Sistema funcionando</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="backdrop-blur-md bg-background/80 border-border shadow-lg">
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>
                    Ações comuns do mestre
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="h-20 flex-col gap-2">
                      <ScrollText className="h-6 w-6" />
                      Criar Nova Sessão
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <Users className="h-6 w-6" />
                      Gerenciar Jogadores
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="players" className="space-y-6">
              <Card className="backdrop-blur-md bg-background/80 border-border shadow-lg">
                <CardHeader>
                  <CardTitle>Jogadores Cadastrados</CardTitle>
                  <CardDescription>
                    Gerencie os jogadores da sua campanha
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum jogador cadastrado ainda</p>
                    <Button className="mt-4">Adicionar Jogador</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="campaign" className="space-y-6">
              <Card className="backdrop-blur-md bg-background/80 border-border shadow-lg">
                <CardHeader>
                  <CardTitle>Configurações da Campanha</CardTitle>
                  <CardDescription>
                    Detalhes da sua campanha de One Piece RPG
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Nome da Campanha</label>
                      <p className="text-muted-foreground">A Jornada dos Piratas</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Nível Recomendado</label>
                      <p className="text-muted-foreground">1-5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="backdrop-blur-md bg-background/80 border-border shadow-lg">
                <CardHeader>
                  <CardTitle>Configurações do Mestre</CardTitle>
                  <CardDescription>
                    Preferências e configurações da conta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Email do Mestre</label>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                  <Button variant="outline">Configurações Avançadas</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
