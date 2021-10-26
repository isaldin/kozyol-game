FROM nginx:1.17
COPY ./docker/conf.d/skazhi.be.conf /etc/nginx/user.conf.d/skazhi.be.conf
COPY ./client/build /usr/share/nginx/html