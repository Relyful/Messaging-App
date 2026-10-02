import { prisma } from './lib/prisma.mjs'

async function main() {
  console.log('--- Starting Seed ---');

  // 1. Create Global Chat first
  const globalChat = await prisma.chat.create({
    data: {
      type: 'GLOBAL', // adjust field name/enum to match your schema (e.g. chat_type: 'GLOBAL')
      name: 'Global Chat',
    },
  });
  console.log('Created Global Chat');

  // 2. Create Users and connect them to Global Chat on creation
  const alice = await prisma.user.create({
    data: {
      username: 'alice_dev',
      password: 'hashed_password_123',
      displayName: 'Alice Wonderland',
      role: 'ADMIN',
      about: 'I love database schemas!',
      chatMembers: {
        create: [
          { chatId: globalChat.id },
        ],
      },
    },
  });

  const bob = await prisma.user.create({
    data: {
      username: 'bob_builder',
      password: 'hashed_password_456',
      displayName: 'Bob Builder',
      chatMembers: {
        create: [
          { chatId: globalChat.id },
        ],
      },
    },
  });
  console.log('Created Users: Alice & Bob (added to Global Chat)');

  // 3. Create Direct / Group Chats
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
      type: 'GROUP',
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

  // 4. Create Messages across chats
  await prisma.message.createMany({
    data: [
      {
        content: 'Welcome to the global room!',
        authorId: alice.id,
        chatId: globalChat.id,
      },
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
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
