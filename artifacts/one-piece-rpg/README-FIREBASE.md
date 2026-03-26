# Configuração do Firebase para One Piece RPG

## 1. Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Nome do projeto: `em-busca-do-one-piece-rpg`
4. Continue com as configurações padrão

## 2. Configurar Authentication

1. No console do Firebase, vá para "Authentication"
2. Clique em "Começar"
3. Na aba "Método de login", habilite "Email/Senha"
4. Ative o método e salve

## 3. Configurar Firestore Database

1. Vá para "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Iniciar em modo de teste" (por enquanto)
4. Escolha um local (ex: `southamerica-east1`)
5. Clique em "Criar"

## 4. Obter Configurações do Firebase

1. Vá para "Configurações do projeto" > "Geral"
2. Na seção "Seus apps", clique no ícone da web (`</>`)
3. Dê um nome ao app (ex: "One Piece RPG")
4. Clique em "Registrar app"
5. Copie as configurações (firebaseConfig)
6. Substitua no arquivo `src/lib/firebase.ts`

## 5. Obter Chave de Service Account (para o seed)

1. Vá para "Configurações do projeto" > "Contas de serviço"
2. Clique em "Gerar nova chave privada"
3. Selecione "Firebase Admin SDK"
4. Clique em "Gerar chave"
5. O arquivo JSON será baixado
6. Renomeie para `serviceAccountKey.json`
7. Coloque na pasta `artifacts/one-piece-rpg/`

## 6. Executar Seed dos Dados

1. Com o `serviceAccountKey.json` no lugar:
```bash
cd artifacts/one-piece-rpg
node seed.cjs
```

2. Isso vai popular o Firestore com:
   - 50 itens de mercado
   - 10 especialidades
   - 4 tipos de Akuma no Mi
   - 3 tipos de Haki

## 7. Deploy do Aplicativo

1. Instale Firebase CLI (se ainda não tiver):
```bash
npm install -g firebase-tools
```

2. Faça login:
```bash
firebase login
```

3. Deploy:
```bash
firebase deploy
```

## Estrutura do Firestore

```
mercado/ (collection)
  - {itemId} (document)
    - nome: "Faca de Arremesso"
    - preco: 200
    - dano: "D4"
    - atributo: "Agilidade"
    - categoria: "Armas"

especialidades/ (collection)
  - "Combatente" (document)
    - bonus: "+5 Vida Máxima"
    - passiva: "Pele de Aço"
    - descricao: "Especialista em combate corpo a corpo"

akuma_no_mi/ (collection)
  - "Paramecia" (document)
    - chance: "01-60"
    - custo_stamina: 10
    - descricao: "Frutas que alteram o corpo do usuário"

hakis/ (collection)
  - "Haoshoku Haki" (document)
    - tipo: "Conquista"
    - descricao: "Poder de intimidar e dominar a vontade dos outros"
    - requisito: "Apenas 1 em 1 milhão"

users/ (collection)
  - {userId} (document)
    - email: "jogador@email.com"
    - personagemId: "personagem123"
    - isMaster: false

characters/ (collection)
  - {characterId} (document)
    - nome: "Monkey D. Luffy"
    - nivel: 5
    - vida: 50
    - stamina: 30
    - forca: 8
    - agilidade: 7
    - astucia: 6
    - especialidade: "Combatente"
    - akumaNoMi: "Gomu Gomu no Mi"
    - haki: ["Haoshoku", "Kenbunshoku"]

ships/ (collection)
  - {shipId} (document)
    - nome: "Thousand Sunny"
    - tipo: "Goa"
    - vida: 100
    - tripulacao: 10
    - velocidade: 8
    - armamento: 16
```

## Regras de Segurança

As regras em `firestore.rules` garantem:
- Apenas usuários autenticados podem ler/escrever
- Apenas o mestre (canalhbit@gmail.com) pode modificar dados do jogo
- Jogadores podem ler o mercado e especialidades
- Cada usuário só pode modificar seus próprios dados
