FROM node:20

# Crea el directorio de la app
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Compila TypeScript
RUN npm run build

# Expone el puerto y corre la app
EXPOSE 3000
CMD ["npm", "start"]
