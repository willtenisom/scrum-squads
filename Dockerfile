# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Final stage
FROM node:18-alpine
WORKDIR /app

# Copia apenas as dependências instaladas no builder (node_modules)
COPY --from=builder /app/node_modules ./node_modules

# Copia o código compilado
COPY --from=builder /app/dist ./dist

# Se precisar de arquivos de configuração (ex: .env) copie também
# COPY .env ./

CMD ["node", "dist/main.js"]
