FROM debian:latest

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y curl build-essential

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y npm

# Verify Node.js and npm were installed successfully
RUN node --version
RUN npm --version

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN groupadd -r debian && useradd -r -g debian -G audio,video debian \
    && mkdir -p /home/debian && chown -R debian:debian /home/debian \
    && chown -R debian:debian /usr/src/app

USER debian

EXPOSE 8080

CMD [ "node", "server.js" ]
