import jwt from "jsonwebtoken";

const SECRET = "supersecretkey";

export function generateToken(user: any) {
  return jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}