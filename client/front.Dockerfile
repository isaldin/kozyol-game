FROM nginx:1.17
COPY ./docker/conf.d/skazhi.be.conf /etc/nginx/user.conf.d
COPY ./client/build /usr/share/nginx/html