
FROM node:20-alpine3.20 AS build

WORKDIR /app

COPY . .

RUN npm install -g npm@10.8.1
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

RUN npm install -g @angular/cli

RUN ng build --configuration=demo

FROM nginx:alpine3.19

ARG ENV=prod
ARG SECRET_KEY
ARG SECRET_CRT

RUN if [ "${ENV}" == "prod" ] ; then echo -e "${SECRET_KEY}" > /etc/ssl/arcadia/server.key ; fi
RUN if [ "${ENV}" == "prod" ] ; then echo -e "${SECRET_CRT}" > /etc/ssl/arcadia/server.crt ; fi

COPY nginx/nginx.${ENV}.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ecf-arcadia-front /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
