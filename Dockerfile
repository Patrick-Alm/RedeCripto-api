FROM oven/bun
WORKDIR /app

COPY package.json bun.lock ./
COPY tsconfig.json ./

RUN bun install

COPY . .

EXPOSE 3001

ENTRYPOINT [ "bun", "run", "dev" ]
