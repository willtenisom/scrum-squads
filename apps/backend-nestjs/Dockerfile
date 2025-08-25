# Imagem base
FROM node:20-alpine

WORKDIR /app

# Copiar package.json do backend
COPY package*.json ./

# Instalar pnpm e dependências
RUN npm install -g pnpm
RUN pnpm install

# Copiar todo o backend
COPY . .

# Build NestJS
RUN pnpm build

EXPOSE 3001

CMD ["node", "dist/main.js"]
