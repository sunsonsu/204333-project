# Introduction

This past is scheduler that using Currency API to get currency infomation, that update in database & cache

## Environment

**First**, you need to add `.env`.

```
# in .env file

DATABASE_URL="postgresql://username:password@host:port/dbname?schema=public"
PORT={ APP PORT }
SECRET_KEY={ APP SECRET KEY }
REDIS_URL=redis://hostname:port
NODE_ENV=development | production
BASE_PATH=/api/coin
```
