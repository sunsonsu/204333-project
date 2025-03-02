# Concurrency Exchange Webstie

## Overview

This project is about simple concurrency exchange do with Next.js PostgreSQL and we will try to make this be advanced website by including Scalability and Microservices.

## Features

- can see concurrency from country to country with include from [openExchange API](https://openexchangerates.org/)

## Development

To start development, you must have **docker** and run **dev_db.sh** to start postgres and redis. Then `setup the environment for each applications.` _read readme.md for each applications_

## Production

To build a production application, you must add **.env** for **each application** and add **.db.env** in this directory.

```
# in .db.env file

POSTGRES_USER: { USERNAME }
POSTGRES_PASSWORD: { PASSWORD }
POSTGRES_DB: { DATABASE_NAME }
```
