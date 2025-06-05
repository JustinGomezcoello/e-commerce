# Utiliza una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo 'package.json' y 'package-lock.json' (si existe)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia los archivos del proyecto al directorio de trabajo
COPY . .

# Expone el puerto que el servidor usará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
