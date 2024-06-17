# Utiliza la última versión de la imagen oficial de Node.js
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Compila la aplicación React
RUN npm run build

# Instala un servidor HTTP para servir el contenido estático
RUN npm install -g serve

# Expone el puerto que el servidor HTTP usará
EXPOSE 3000

# Define el comando que se ejecutará al iniciar el contenedor
CMD ["serve", "-s", "build", "-l", "3000"]
