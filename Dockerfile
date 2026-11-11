# # 1. Base: Node.js wala ready kitchen
# FROM node:20

# # 2. Dabbe ke andar kaam karne ka folder
# WORKDIR /app

# # 3. Pehle sirf package files copy karke libraries install
# COPY package*.json ./
# RUN npm install

# # 4. Phir baaki saara code copy
# COPY . .

# # 5. Batao ki server 2000 darwaze pe sunta hai
# EXPOSE 2000

# # 6. Dabba chalu hote hi ye command chale
# CMD ["node", "server.js"]





FROM node:22-slim

# better-sqlite3 ko compile karne ke tools
RUN apt-get update && apt-get install -y python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install --build-from-source=better-sqlite3

COPY . .

EXPOSE 2000

CMD ["node", "server.js"]