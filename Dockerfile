 	FROM alpine:3.16

    ARG WORKING_DIR=$HOME/travel-app/
    ARG PORT=3000
    
    RUN apk add --update-cache nodejs npm

    WORKDIR $WORKING_DIR

    COPY  ./package*.json $WORKING_DIR/
    RUN npm install --only=production

    COPY  . $WORKING_DIR/

    EXPOSE $PORT

    CMD [ "node", "index.js" ]