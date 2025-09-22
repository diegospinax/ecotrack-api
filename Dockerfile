# --- Fase 1: Builder ---
# En esta fase se instala todo y se compila el proyecto
FROM node:20-alpine AS builder

# Directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluidas las de desarrollo para compilar)
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar el código TypeScript a JavaScript
RUN npm run build

# --- Fase 2: Production ---
# En esta fase se crea la imagen final solo con lo necesario para producción
FROM node:20-alpine

WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo las dependencias de producción
RUN npm install --omit=dev

# Copiar el código compilado desde la fase 'builder'
COPY --from=builder /usr/src/app/dist ./dist

# Exponer el puerto en el que corre la aplicación
EXPOSE 4200

# Comando para iniciar la aplicación
CMD [ "node", "dist/index.js" ]
