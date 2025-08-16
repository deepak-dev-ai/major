import jwt from "jsonwebtoken";

type Payload = {
  id: string;
};

export function generatedToken(data: Payload) {
  return jwt.sign(data, process.env.JWT_SECRET as string);
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as Payload;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
