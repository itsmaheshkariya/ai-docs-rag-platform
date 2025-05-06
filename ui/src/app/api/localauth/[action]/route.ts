// app/api/localauth/[action]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const uri = process.env.MONGODB_URI || "mongodb+srv://mahesh:Mahesh619619@cluster0.ntelr.mongodb.net/?retryWrites=true&w=majority";
const dbName = "authDB";
const usersCollection = "users";
let client: MongoClient;

async function getDbClient() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db(dbName).collection(usersCollection);
}

export async function POST(request: NextRequest, { params }: { params: { action: string } }) {
  const { action } = params;

  if (action === "register") {
    const { email, password, name }: any = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const collection = await getDbClient();

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, name, password: hashedPassword };

    await collection.insertOne(newUser);

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  }

  if (action === "login") {
    const { email, password }: any = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const collection = await getDbClient();

    const user = await collection.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    });

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  }

  if (action === "forgot-password") {
    const { email }: any = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const collection = await getDbClient();

    const user = await collection.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "15m",
    });

    console.log(`Reset token for ${email}: ${resetToken}`);

    return NextResponse.json({ message: "Password reset token sent" }, { status: 200 });
  }

  if (action === "reset-password") {
    const { token, newPassword }: any = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json({ error: "Token and new password are required" }, { status: 400 });
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
      const collection = await getDbClient();

      const user = await collection.findOne({ _id: new ObjectId(decoded.id) });
      if (!user) {
        return NextResponse.json({ error: "Invalid token" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await collection.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });

      return NextResponse.json({ message: "Password reset successful" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }
  }

  return NextResponse.json({ error: "Invalid endpoint" }, { status: 404 });
}