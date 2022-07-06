#!/bin/bash

filebeat setup
service filebeat start

metricbeat modules enable system

metricbeat setup
service metricbeat start
systemctl enable metricbeat

npm run dev