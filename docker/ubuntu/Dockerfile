FROM ubuntu:latest

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y curl build-essential

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Verify Node.js and npm were installed successfully
RUN node --version
RUN npm --version

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN groupadd -r ubuntu && useradd -r -g ubuntu -G audio,video ubuntu \
    && mkdir -p /home/ubuntu && chown -R ubuntu:ubuntu /home/ubuntu \
    && chown -R ubuntu:ubuntu /usr/src/app

USER ubuntu

EXPOSE 8080

CMD [ "node", "server.js" ]
