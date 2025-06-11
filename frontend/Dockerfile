# Utiliza una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo 'package.json' y 'package-lock.json' (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto usando --legacy-peer-deps para evitar conflictos
RUN npm install --legacy-peer-deps

# Copia los archivos del proyecto al directorio de trabajo
COPY . .

# Asegurarse de que el directorio de imágenes existe
RUN mkdir -p src/assets/images

# Establecer variables de entorno para React
ENV NODE_ENV=production
ENV CI=false
ENV PORT=3000

# Construir la aplicación
RUN npm run build --legacy-peer-deps

# Instalar serve para servir la aplicación
RUN npm install -g serve

# Expone el puerto que el servidor usará
EXPOSE 3000

# Comando para servir la aplicación construida con opciones específicas
CMD ["serve", "-s", "build", "--listen", "3000", "--no-clipboard", "--single"]
