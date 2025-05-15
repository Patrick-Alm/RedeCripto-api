FROM oven/bun AS builder
WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential python3 python3-dev \
    && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lock ./
RUN bun install --ignore-optional

FROM oven/bun
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 3001
ENTRYPOINT ["bun", "run", "dev"]
