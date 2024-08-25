### Changing Prisma Schema ###
run `npx prisma generate` in /meleeguessr-server

### Building & Deploying to AWS Lambda with SAM ###
1. When ready to push, run `npm run test` which compiles and tests the functions

2. `cd` up to sam-app/ and run `sam build` and `sam deploy --guided`

3. Hit y on everything and test endpoint on postman