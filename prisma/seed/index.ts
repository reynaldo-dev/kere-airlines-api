import { PrismaClient } from '@prisma/client';
import { clients } from './data/client.seeders';

import { users } from './data/users.seeders';

const prisma = new PrismaClient();

async function main() {
   await prisma.userr.createMany({
      skipDuplicates: true,
      data: users,
   });
   await prisma.client.createMany({
      skipDuplicates: true,
      data: clients,
   });
}

main()
   .then(async () => {
      console.log('Seeding completed');
   })
   .catch(async (e) => {
      console.error(e);
   });
