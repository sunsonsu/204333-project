#!/bin/bash

docker pull postgres:16
docker pull redis:alpine

dbname=204333_dev_db
dbpass=1234
dbuser=dev
dbdb=dev

docker run \
    --name "$name" \
    -e "POSTGRES_PASSWORD=$pass" \
    -e "POSTGRES_USER=$user" \
    -e "POSTGRES_DB=$db" \
    -v ./postgres-data:/var/lib/postgresql/data \
    -p 5432:5432 \
    -d postgres:16-alpine

rdname=204333_redis

docker run \
    --name "$rdname" \
    -p 6379:6379 \
    -d redis:alpine