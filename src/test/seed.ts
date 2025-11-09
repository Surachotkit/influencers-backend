import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  // สร้างผู้ใช้ admin
  const admin = await prisma.user.create({
    data: {
      fullName: "Admin User",
      email: "admin@example.com",
      password: "hashedpassword",
      role: "Admin",
    },
  });

  // สร้าง influencer ตัวอย่าง
  await prisma.influencer.create({
    data: {
      recordId: 1,
      recordType: "influencer",
      fullName: "Lisa Kim",
      preferredName: "Lisa",
      gender: "Female",
      city: "Bangkok",
      country: "Thailand",
      influencerCategory: "Fashion",
      primaryPlatform: "Instagram",
      followersCount: 2000000,
      totalFollowersCount: 2500000,
      engagementRate: 4.5,
      engagementRateTier: "High",
      interests: ["fashion", "beauty", "travel"],
      languages: ["Thai", "English"],
      collaborationStatus: "Open",
      portfolioUrl: "https://instagram.com/lisakim",
      createdByUser: { connect: { id: admin.id } },
    },
  });
}

seed()
  .then(() => console.log("✅ Seeding complete"))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
