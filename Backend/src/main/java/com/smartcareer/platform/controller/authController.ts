import bcrypt from "bcrypt";
import { generateToken } from "../auth";

// ⚠️ Replace with your DB logic
const users: any[] = [];

export async function login(req: any, res: any) {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
    },
  });
}