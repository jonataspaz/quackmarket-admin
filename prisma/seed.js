const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categories = [
  { name: "Electronics" },
  { name: "Vehicles" },
  { name: "Clothing" },
  { name: "Home Goods" },
  { name: "Garden and outdoors" },
  { name: "Hobbies" },
  { name: "Sporting Goods" },
  { name: "Toys & games" },
  { name: "Pet supplies" },
];

const seed = async () => {
  try {
    await prisma.category.createMany({
      data: categories,
    });
    console.log("Categories Created!");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
