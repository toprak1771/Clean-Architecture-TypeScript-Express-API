import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const newUser = await prisma.user.upsert({
        where: {
            email:'topraktest@mail.com'
        },
        update: {},
        create: {
            email:'topraktest@mail.com',
            password:'deneme'
        }
    })

    console.log({newUser})
}
main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
})
