FROM node:12
# Creando el directorio de la aplicación
WORKDIR /casino
COPY package*.json ./
RUN npm --production install
# Copiando toda la app
COPY . .
EXPOSE 3000
# RUN npm run prod -- --staging
# RUN npm run prod
CMD [ "npm", "start" ]
