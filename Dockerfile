FROM node:16.14.0 AS build
ENV NODE_ENV=dev


RUN mkdir /app
WORKDIR /app


COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

RUN curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.13.0-amd64.deb && \
    dpkg -i filebeat-7.13.0-amd64.deb

RUN curl -L -O https://artifacts.elastic.co/downloads/beats/metricbeat/metricbeat-7.6.2-amd64.deb && \
    dpkg -i metricbeat-7.6.2-amd64.deb

COPY filebeat.yml /etc/filebeat/filebeat.yml
COPY metricbeat.yml /etc/metricbeat/metricbeat.yml

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh




ENTRYPOINT [ "/entrypoint.sh" ]
