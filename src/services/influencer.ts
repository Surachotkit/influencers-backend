import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

export class InfluencerService {
  async create(data: Prisma.InfluencerCreateInput) {
    return await prisma.influencer.create({ data });
  }

  async findAll() {
    return await prisma.influencer.findMany();
  }

  async findById(id: number) {
    return await prisma.influencer.findUnique({
      where: { id },
    });
  }

  async findUserManagement(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const influencer = await prisma.influencer.findMany({
      where: { createdBy: userId },
      include: {
        createdByUser: true,
      },
    });

    const results = [{ ...user }, ...influencer.map((item) => ({ ...item }))];

    return results;
  }

  async update(id: number, data: Prisma.InfluencerUpdateInput) {
    return await prisma.influencer.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return await prisma.influencer.delete({
      where: { id },
    });
  }
}
