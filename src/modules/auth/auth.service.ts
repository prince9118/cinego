import bcrypt from "bcrypt";
import { prisma } from "../..//config/prisma.js";
import type { SignUpInput, LoginInput } from "./auth.schema.js";
import jwt from "jsonwebtoken";

export async function signup(input: SignUpInput) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: input.email
    }
  });
  if (existingUser) {
    throw new Error("User already exist");
  }

  const hashedPassword = await bcrypt.hash(input.password, 12);

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: hashedPassword
    }
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({
    where: {
      email: input.email
    }
  });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(input.password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not config");
  }
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role
    },
    secret,
    {
      expiresIn: "7d"
    }
  );
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  };
}
