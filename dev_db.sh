#!/bin/bash

docker pull postgres:16
docker pull redis:alpine

dbname=204333_dev_db
dbpass=1234
dbuser=dev
dbdb=dev

docker run \
    --name "$dbname" \
    -e "POSTGRES_PASSWORD=$dbpass" \
    -e "POSTGRES_USER=$dbuser" \
    -e "POSTGRES_DB=$dbdb" \
    -v ./postgres-data:/var/lib/postgresql/data \
    -p 5432:5432 \
    -d postgres:16-alpine

rdname=204333_redis

docker run \
    --name "$rdname" \
    -p 6379:6379 \
    -d redis:alpine