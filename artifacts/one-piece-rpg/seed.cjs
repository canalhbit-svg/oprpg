const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const seedData = async () => {
  // --- 1. POPULAR MERCADO (50 ITENS) ---
  const mercado = [
    { nome: "Faca de Arremesso", preco: 200, dano: "D4", atributo: "Agilidade", categoria: "Armas" },
    { nome: "Adaga de Aço", preco: 500, dano: "D6", atributo: "Agilidade", categoria: "Armas" },
    { nome: "Espada Curta", preco: 1000, dano: "D8", atributo: "Força", categoria: "Armas" },
    { nome: "Sabre de Pirata", preco: 2000, dano: "D10", atributo: "Força", categoria: "Armas" },
    { nome: "Clava de Madeira", preco: 100, dano: "D4", atributo: "Força", categoria: "Armas" },
    { nome: "Martelo de Guerra", preco: 1500, dano: "D8", atributo: "Força", categoria: "Armas" },
    { nome: "Lança de Caça", preco: 800, dano: "D6", atributo: "Agilidade", categoria: "Armas" },
    { nome: "Arco Longo", preco: 1200, dano: "D6", atributo: "Agilidade", categoria: "Armas" },
    { nome: "Besta Leve", preco: 2000, dano: "D8", atributo: "Agilidade", categoria: "Armas" },
    { nome: "Pistola de Pederneira", preco: 3000, dano: "D6", atributo: "Agilidade", categoria: "Armas" },
    { nome: "Espadona", preco: 5000, dano: "D12", atributo: "Força", categoria: "Armas" },
    { nome: "Katana", preco: 4000, dano: "D10", atributo: "Agilidade", categoria: "Armas" },
    { nome: "Rapier", preco: 3500, dano: "D8", atributo: "Agilidade", categoria: "Armas" },
    { nome: "Machado de Batalha", preco: 2500, dano: "D10", atributo: "Força", categoria: "Armas" },
    { nome: "Foice", preco: 1800, dano: "D8", atributo: "Agilidade", categoria: "Armas" },
    { nome: "Nunchaku", preco: 600, dano: "D4", atributo: "Agilidade", categoria: "Armas" },
    { nome: "Bo Staff", preco: 400, dano: "D4", atributo: "Força", categoria: "Armas" },
    { nome: "Sai Duplo", preco: 900, dano: "D6", atributo: "Agilidade", categoria: "Armas" },
    { nome: "Tonfa", preco: 700, dano: "D4", atributo: "Força", categoria: "Armas" },
    { nome: "Kama", preco: 1100, dano: "D6", atributo: "Agilidade", categoria: "Armas" },
    { nome: "Log Pose", preco: 5000, descricao: "Essencial na Grand Line", categoria: "Navegação" },
    { nome: "Eternal Pose", preco: 50000, descricao: "Aponta para uma ilha específica sempre", categoria: "Navegação" },
    { nome: "Bússola Normal", preco: 500, descricao: "Funciona fora da Grand Line", categoria: "Navegação" },
    { nome: "Mapa do Tesouro", preco: 10000, descricao: "Leva a um tesouro misterioso", categoria: "Navegação" },
    { nome: "Diário de Bordo", preco: 200, descricao: "Para registrar suas aventuras", categoria: "Navegação" },
    { nome: "Ração Seca (1 dia)", preco: 20, cura: "1 Vida", categoria: "Consumíveis" },
    { nome: "Ração Militar (1 dia)", preco: 50, cura: "2 Vida", categoria: "Consumíveis" },
    { nome: "Carne Assada", preco: 100, cura: "3 Vida", categoria: "Consumíveis" },
    { nome: "Sopa Curativa", preco: 300, cura: "5 Vida", categoria: "Consumíveis" },
    { nome: "Poção de Cura", preco: 1000, cura: "10 Vida", categoria: "Consumíveis" },
    { nome: "Elixir de Vida", preco: 10000, cura: "Vida Cheia", categoria: "Consumíveis" },
    { nome: "Cerveja", preco: 50, stamina: "2", categoria: "Consumíveis" },
    { nome: "Rum", preco: 80, stamina: "3", categoria: "Consumíveis" },
    { nome: "Sake", preco: 120, stamina: "4", categoria: "Consumíveis" },
    { nome: "Energético", preco: 200, stamina: "5", categoria: "Consumíveis" },
    { nome: "Stamina Max", preco: 500, stamina: "10", categoria: "Consumíveis" },
    { nome: "Den Den Mushi Comum", preco: 10000, categoria: "Raros" },
    { nome: "Den Den Mushi Visual", preco: 50000, categoria: "Raros" },
    { nome: "Den Den Mushi de Emergência", preco: 15000, categoria: "Raros" },
    { nome: "Den Den Mushi Negro", preco: 100000, categoria: "Raros" },
    { nome: "Wanted Poster Falso", preco: 5000, categoria: "Raros" },
    { nome: "Dispositivo de Traição", preco: 20000, categoria: "Raros" },
    { nome: "Poneglyph", preco: 1000000, descricao: "Fragmento da história antiga", categoria: "Raros" },
    { nome: "Arma de Seastone", preco: 50000, dano: "D6", categoria: "Armas", especial: "Dano em Akumas" },
    { nome: "Armadura de Seastone", preco: 100000, defesa: "+5", categoria: "Armaduras", especial: "Proteção contra Akumas" },
    { nome: "Bolsa de Berries", preco: 10000, descricao: "Contém 10.000 berries", categoria: "Diversos" },
    { nome: "Bolsa de Berries Grande", preco: 100000, descricao: "Contém 100.000 berries", categoria: "Diversos" },
    { nome: "Mapa da Grand Line", preco: 50000, descricao: "Mapa parcial da Grand Line", categoria: "Navegação" },
    { nome: "Diário de Roger", preco: 1000000, descricao: "O diário do Rei dos Piratas", categoria: "Raros" },
    { nome: "Chave do One Piece", preco: 10000000, descricao: "A chave para o maior tesouro", categoria: "Raros" }
  ];

  // --- 2. POPULAR ESPECIALIDADES (DO SEU PRINT) ---
  const especialidades = [
    { nome: "Combatente", bonus: "+5 Vida Máxima", passiva: "Pele de Aço", descricao: "Especialista em combate corpo a corpo" },
    { nome: "Espadachim", bonus: "+2 Dano com Lâminas", passiva: "Estilo de Luta", descricao: "Mestre das artes com espadas" },
    { nome: "Atirador", bonus: "+2 Pontaria", passiva: "Olhar de Águia", descricao: "Precisão mortal à distância" },
    { nome: "Médico", bonus: "Cura D10 no Descanso", passiva: "Tratamento Especial", descricao: "Especialista em cuidados médicos" },
    { nome: "Músico", bonus: "Recupera Stamina em Grupo", passiva: "Sinfonia", descricao: "Usa música para inspirar aliados" },
    { nome: "Arqueólogo", bonus: "Vantagem em Astúcia", passiva: "Leitura Ancestral", descricao: "Conhecedor da história antiga" },
    { nome: "Ladrão", bonus: "Ação Bônus para Roubar", passiva: "Mãos Leves", descricao: "Especialista em furtividade e roubo" },
    { nome: "Cozinheiro", bonus: "Comidas curam +2", passiva: "Chef Expert", descricao: "Mestre culinário do mar" },
    { nome: "Navegador", bonus: "+2 em Navegação", passiva: "Instinto de Navegação", descricao: "Especialista em rotas marítimas" },
    { nome: "Cientista", bonus: "+2 em Ciência", passiva: "Invenção", descricao: "Gênio da ciência e tecnologia" }
  ];

  // --- 3. TABELA DE AKUMA NO MI ---
  const akumas = [
    { tipo: "Paramecia", chance: "01-60", custo_stamina: 10, descricao: "Frutas que alteram o corpo do usuário" },
    { tipo: "Zoan", chance: "61-85", custo_stamina: 15, descricao: "Frutas que permitem transformação em animais" },
    { tipo: "Logia", chance: "86-95", custo_stamina: 20, descricao: "Frutas que permitem controle de elementos" },
    { tipo: "Ancestral/Mítica", chance: "96-100", custo_stamina: 30, descricao: "Frutas lendárias com poderes divinos" }
  ];

  // --- 4. HAKIS ---
  const hakis = [
    { nome: "Haoshoku Haki", tipo: "Conquista", descricao: "Poder de intimidar e dominar a vontade dos outros", requisito: "Apenas 1 em 1 milhão" },
    { nome: "Kenbunshoku Haki", tipo: "Percepção", descricao: "Sentir a presença e intenções dos outros", requisito: "Treinamento intensivo" },
    { nome: "Busoshoku Haki", tipo: "Armadura", descricao: "Criar armadura invisível e tocar Akumas", requisito: "Força de vontade" }
  ];

  console.log("Iniciando o carregamento dos dados no One Piece RPG...");

  try {
    // Upload Mercado
    console.log("Carregando mercado...");
    for (const item of mercado) {
      await db.collection("mercado").add(item);
    }
    console.log(`✅ Mercado: ${mercado.length} itens adicionados`);

    // Upload Especialidades
    console.log("Carregando especialidades...");
    for (const esp of especialidades) {
      await db.collection("especialidades").doc(esp.nome).set(esp);
    }
    console.log(`✅ Especialidades: ${especialidades.length} especialidades adicionadas`);

    // Upload Akuma logic
    console.log("Carregando Akuma no Mi...");
    for (const akuma of akumas) {
      await db.collection("akuma_no_mi").doc(akuma.tipo).set(akuma);
    }
    console.log(`✅ Akuma no Mi: ${akumas.length} tipos adicionados`);

    // Upload Hakis
    console.log("Carregando Hakis...");
    for (const haki of hakis) {
      await db.collection("hakis").doc(haki.nome).set(haki);
    }
    console.log(`✅ Hakis: ${hakis.length} hakis adicionados`);

    console.log("\n🎉 Sucesso! O mundo de One Piece está pronto no Firestore.");
    console.log("📊 Resumo:");
    console.log(`   • Mercado: ${mercado.length} itens`);
    console.log(`   • Especialidades: ${especialidades.length} especialidades`);
    console.log(`   • Akuma no Mi: ${akumas.length} tipos`);
    console.log(`   • Hakis: ${hakis.length} hakis`);
    
  } catch (error) {
    console.error("❌ Erro ao carregar dados:", error);
  } finally {
    admin.app().delete();
  }
};

seedData().catch(console.error);
