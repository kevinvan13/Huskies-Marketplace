import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const verifyUser = async (req, res) => {
  try {
    const authId = req.auth.payload.sub;
    const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/email`];
    const username = req.auth.payload[`${process.env.AUTH0_AUDIENCE}/username`];
    const user = await prisma.user.findUnique({
      where: {
        authId,
      },
    });
    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          authId,
          email,
          username,
        },
      });
      res.json(newUser);
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, address } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        address,
      },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
