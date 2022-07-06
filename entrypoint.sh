#!/bin/bash

filebeat setup
service filebeat start
npm run dev