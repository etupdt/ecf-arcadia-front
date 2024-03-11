FROM httpd:latest

# RUN apt-get upgrade
RUN apt-get update

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

RUN apt-get install nodejs npm -yq

RUN npm install -g npm@latest

RUN npm install -g @angular/cli

WORKDIR /usr/local/apache2/htdocs

COPY ./ ./

EXPOSE 80
