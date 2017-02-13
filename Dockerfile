FROM smebberson/alpine-nginx
#FROM drakerin/rpi-alpine-nginx

WORKDIR /dorry-web
COPY ./dist/ /dorry-web/
COPY default.conf /etc/nginx/conf.d/default.conf
RUN chown root /etc/nginx/conf.d/default.conf && \
    chgrp root /etc/nginx/conf.d/default.conf

#CMD nginx -s reload
