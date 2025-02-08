# Introduction

This past is scheduler that using Currency API to get currency infomation, that update in database & cache

## Environment

**First**, you need to add `.env`.

```
# in .env file

DATABASE_URL="postgresql://username:password@host:port/dbname?schema=public"
API={ CURRENCY API }
PORT={ APP PORT }
REDIS_URL=redis://hostname:port
OPENEXCHANGE_APP_ID={ APP ID }
```
