#!/bin/sh  

# Apply Prisma migrations and start the application  
npx prisma migrate deploy --schema=/usr/src/app/src/infra/database/prisma/schema.prisma  
npx prisma generate --schema=/usr/src/app/src/infra/database/prisma/schema.prisma  

# Run database migrations  
npx prisma migrate dev --name init --schema=/usr/src/app/src/database/schema.prisma
ts-node ./src/infra/database/seeder/seed.ts

# Run the main container command  
exec "$@"