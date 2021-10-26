FROM nginx:1.17
WORKDIR client/build
COPY . /usr/share/nginx/html