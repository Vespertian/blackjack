FROM node:12
# Creando el directorio de la aplicación
WORKDIR /casino
COPY package*.json ./
RUN npm install
# Copiando toda la app
COPY . .
EXPOSE 8000
# RUN npm run prod -- --staging
#RUN npm run dev
CMD [ "npm", "start" ]
