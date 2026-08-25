to bcrypt
>>npm i bcrypt

to prisma
>>

for cookie handling
npm i cookie-parser
npm i jsonwebtoken  //jwt

JWT_SECRET_KEY
openssl rand -base64 32// doesnd work

i didnt i the .env environment  i just add --env-file .env
now i download (2026.02.23)

## Rules
# Setup Guide

## Dependencies
- bcrypt: `npm i bcrypt`
- cookie-parser: `npm i cookie-parser`
- jsonwebtoken (JWT): `npm i jsonwebtoken`

## Environment Configuration
- Set `JWT_SECRET_KEY` in `.env` file
- Run with: `node app.js --env-file .env`

## Database Schema
if u do any chages from prisma
>> need to run "npx prisma db push"


to sent form data to api
>>use axios
to recive data from client
>>use cors