FROM node

# Tells docker all the command will be executed in this directory
# Working directory relative
WORKDIR /app

# Which file you want to copy to the image
# COPY . .
# [COPY COMMAND] [FILE WHO WANT TO MOVE] [WHERE TO PUT THOSE FILES]
COPY package.json /app

# Run command in the images 
# By default will be execute in root directory in the images
RUN npm install

COPY . /app

EXPOSE 80

CMD ["node", "server.js"]