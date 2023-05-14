# pull official base image
FROM node:16 as client-build

# set working directory
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install 
COPY client/ .
RUN npm run build

FROM keymetrics/pm2
WORKDIR /app
COPY server/package*.json ./
RUN npm install
RUN ls -la
COPY ./server/ /app
RUN ls -la
COPY --from=client-build /app/client/build ./build
RUN ls -la
# start app
EXPOSE 3000
CMD ["pm2-runtime", "start", "bin/www"]
#ENTRYPOINT ["tail", "-f", "/dev/null"]
