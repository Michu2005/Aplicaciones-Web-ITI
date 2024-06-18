🐋 DOCKERFILE

El archivo Dockerfile incluido en este repositorio se utiliza para construir una imagen Docker de esta aplicación. Aquí está la explicación detallada de cada comando en el Dockerfile:

a. FROM node:latest: Usa la imagen oficial de Node.js como imagen base.
b. WORKDIR /app: Establece el directorio de trabajo en /app.
c. COPY package.json ./*: Copia los archivos package.json y package-lock.json al directorio de trabajo.
d. RUN npm install: Instala las dependencias del proyecto.
e. COPY . .: Copia todos los archivos del proyecto al directorio de trabajo.
f. RUN npm run build: Construye la aplicación React para producción.
g. RUN npm install -g serve: Instala serve globalmente para servir la aplicación.
h. EXPOSE 3000: Expone el puerto 3000.
i. CMD ["serve", "-s", "build", "-l", "3000"]: Comando por defecto para iniciar el contenedor.

📁 Construir la imagen Docker
Para construir la imagen Docker de este proyecto, utiliza el siguiente comando:

docker build -t michu20/aplicaciones-web-iti .

⬆️ El comando que se usó para subir la imagen a DockerHub:

docker push michu20/aplicaciones-web-iti


👩🏻‍💻 Para usar la imagen de Docker, se utiliza:

docker pull michu20/aplicaciones-web-iti

🔗 Link del Repositorio de DockerHub
https://hub.docker.com/repository/docker/michu20/aplicaciones-web-iti/general

