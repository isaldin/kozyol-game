FROM nginx:1.17
RUN pwd
RUN ls
COPY ./client/build/ /usr/share/nginx/html