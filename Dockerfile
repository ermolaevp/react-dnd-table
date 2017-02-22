FROM node:4.6

RUN mkdir -p /var/www

WORKDIR /var/www

COPY package.json .

RUN npm install

COPY src /var/www/src

ADD entrypoint.sh /sbin/entrypoint.sh
RUN chmod 755 /sbin/entrypoint.sh
ENTRYPOINT ["/sbin/entrypoint.sh"]
