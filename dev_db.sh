#!/bin/bash

docker pull postgres:16

name=204333_dev_db
pass=1234
user=dev
db=dev

docker run \
    --name "$name" \
    -e "POSTGRES_PASSWORD=$pass" \
    -e "POSTGRES_USER=$user" \
    -e "POSTGRES_DB=$db" \
    -v ./postgres-data:/var/lib/postgresql/data \
    -p 5432:5432 \
    -d postgres:16