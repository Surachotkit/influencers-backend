import { PrismaClient } from "@prisma/client";
import influencersData from "./influencers.json";

const prisma = new PrismaClient();

async function seed() {
  // สร้างผู้ใช้ admin
  await prisma.user.create({
    data: {
      fullName: "Admin123",
      email: "admin@influencer.com",
      password: "123456",
      role: "Admin",
    },
  });

  for (const data of influencersData) {
    await prisma.influencer.create({
      data: {
        ...data,
        recordId: data.recordId,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        lastContactDate: data.lastContactDate
          ? new Date(data.lastContactDate)
          : null,
      },
    });
  }
  console.log("✅ Seeded successfully!", influencersData.length);
}

seed()
  .then(() => console.log("✅ Seeding complete"))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
