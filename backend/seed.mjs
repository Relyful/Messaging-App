import { prisma } from './lib/prisma.mjs'

async function main() {
  console.log('--- Starting Seed ---');

  const alice = await prisma.user.create({
    data: {
      username: 'alice_dev',
      password: 'hashed_password_123',
      displayName: 'Alice Wonderland',
      role: "ADMIN",
      about: 'I love database schemas!',
    },
  });

  const bob = await prisma.user.create({
    data: {
      username: 'bob_builder',
      password: 'hashed_password_456',
      displayName: 'Bob Builder'
    },
  });
  console.log('Created Users: Alice & Bob');

  const soloChat = await prisma.chat.create({
    data: {
      chatMembers: {
        create: [
          { userId: alice.id },
          { userId: bob.id },
        ],
      },
    },
  });

  const groupChat = await prisma.chat.create({
    data: {
      type: "GROUP",
      name: 'Dev Team Chat',
      chatMembers: {
        create: [
          { userId: alice.id },
          { userId: bob.id },
        ],
      },
    },
  });

  console.log('Created Chats: 1 Solo, 1 Group');

  await prisma.message.createMany({
    data: [
      {
        content: 'Hey Bob, did you see the new Prisma schema?',
        authorId: alice.id,
        chatId: soloChat.id,
      },
      {
        content: 'Yeah, looks great!',
        authorId: bob.id,
        chatId: soloChat.id,
      },
      {
        content: 'Welcome to the group chat everyone!',
        authorId: alice.id,
        chatId: groupChat.id,
      },
    ],
  });

  console.log('--- Seed Complete! ---');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1);
  })