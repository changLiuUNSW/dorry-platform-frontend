FROM smebberson/alpine-nginx
#FROM drakerin/rpi-alpine-nginx

WORKDIR /dorry-web
COPY ./dist/ /dorry-web/
COPY default.conf /etc/nginx/conf.d/default.conf
RUN chown root /etc/nginx/conf.d/default.conf && \
    chgrp root /etc/nginx/conf.d/default.conf

COPY ./init.sh /dorry-web/
RUN chown root /dorry-web/init.sh && \
    chgrp root /dorry-web/init.sh
RUN chmod 755 /dorry-web/init.sh

#CMD nginx -s reload
CMD /dorry-web/init.sh && /bin/sh
