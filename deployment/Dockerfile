FROM node:lts

RUN apt-get update \
 && apt-get install -y \
      python3 \
      g++ \
      make \
      libvips-dev \
      curl \
      unzip \
 && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

COPY package.json ./
RUN bun install --no-cache
RUN npm install sharp
RUN npm rebuild sharp

COPY src/ ./src/
COPY docs/ ./docs/

ENV NODE_OPTIONS="--max-old-space-size=2048"

COPY deployment/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

 
EXPOSE 3500

ENTRYPOINT ["./entrypoint.sh"]
