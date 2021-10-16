FROM nginx:alpine

WORKDIR /src

RUN set -eux; \
	apk add --no-cache --virtual .build-deps \
	bash \
	gcc \
	gnupg \
	go \
	musl-dev \
	openssl \
    curl \
    nodejs npm

COPY . .

WORKDIR "/src/web"
RUN npm install
RUN npm run build --prod
RUN cp ./nginx.conf /etc/nginx/
RUN cp dist/alonserrano-md-wiki/*.* /usr/share/nginx/html/

WORKDIR "/src/api"
RUN chmod +x ./script.sh
RUN go build -tags netgo -o . .
EXPOSE 9090
EXPOSE 8080

CMD ["sh","./script.sh"]

# docker run -ti -p 8080:8080 -p 9090:9090  md-wiki:2019
