import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcrypt";
import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const SignUpFormSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

const SignUp = SignUpFormSchema.omit({ id: true });
export type SignUpState = {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    passwordsMatch?: string[];
  };
  message?: string | null;
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signUp(prevState: SignUpState, formData: FormData) {
  const validatedFields = SignUpFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { email, password, confirmPassword } = validatedFields.data;
  if (password !== confirmPassword) {
    return {
      errors: { passwordsMatch: ["Passwords do not match"] },
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;
  await sql`
    INSERT INTO users (email, password)
    VALUES (${email}, ${hashedPassword})
    ON CONFLICT (id) DO NOTHING;
  `;
  await signIn("credentials", { email, password });
  return { message: "User created successfully" };
}
