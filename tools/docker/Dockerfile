# This dockerfile should work for all traditional apps,
# i.e. it only sets up a nginx server with the app dist folder

FROM nginx:1.24-alpine

ARG APP_NAME="catalogue"

COPY dist/apps/datahub/browser /usr/share/nginx/html/${APP_NAME}/
COPY tools/docker/docker-entrypoint.sh /

COPY tools/webcomponent/wc-embedder.html /usr/share/nginx/html/${APP_NAME}

# copy default NGINX conf & put the app name in it
COPY tools/docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["sh", "/docker-entrypoint.sh", "nginx", "-g", "daemon off;"]
