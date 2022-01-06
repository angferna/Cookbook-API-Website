FROM node:16-stretch

WORKDIR /app/web2

# Update installation repositories to add additional mirrors for stretch
RUN echo \
       'deb ftp://ftp.us.debian.org/debian/ stretch main\n \
        deb ftp://ftp.us.debian.org/debian/ stretch-updates main\n \
        deb http://security.debian.org stretch/updates main\n' \
        > /etc/apt/sources.list

# Install common installation dependencies
RUN apt-get update && apt install -yq apt-transport-https ca-certificates wget dirmngr gnupg software-properties-common

# Set up repo for MongoDB client
RUN wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -
RUN echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/debian stretch/mongodb-org/5.0 main" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# Set up repo for OpenJDK
RUN wget -qO - https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public | apt-key add -
RUN add-apt-repository --yes https://adoptopenjdk.jfrog.io/adoptopenjdk/deb/

# Install required dependencies
RUN apt-get update && apt-get install -yq \
    adoptopenjdk-11-hotspot \
    dos2unix \
    git-core \
    libgconf2-4 \
    libncurses5 \
    libxml2-dev \
    libxslt-dev \
    libz-dev \
    mongodb-org-shell \
    mongodb-org-tools \
    nasm \
    python-pytest \
    unzip \
    xclip \
    xsel \
    xvfb

# Update NPM to latest version
RUN npm i npm@latest

# Install Heroku CLI
RUN npm install -g heroku

# Install Gulp Build Tool
RUN npm install -g gulp@3.9.1

COPY scripts/wait.sh /app/wait.sh
RUN dos2unix /app/wait.sh && chmod a+x /app/wait.sh

ENTRYPOINT ["/app/wait.sh"]
