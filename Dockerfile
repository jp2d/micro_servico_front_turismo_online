# Define a imagem base
FROM nginx:alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo HTML estático para a pasta de conteúdo do NGINX
COPY .  /usr/share/nginx/html

# A porta 80 é a porta padrão para o servidor web
EXPOSE 80

# Inicie o servidor NGINX
CMD ["nginx", "-g", "daemon off;"]