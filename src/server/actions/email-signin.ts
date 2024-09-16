"use server";
import { LoginSchema } from "@/types/login-schema";

import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./email";
import { signIn } from "../auth";
import { AuthError } from "next-auth";
import { createSafeActionClient } from "next-safe-action";

const action = createSafeActionClient();

export const emailSignIn = action(LoginSchema, async ({ email, password }) => {
  try {
    // Check if the user is in the database
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) {
      return { error: "Email not found" };
    }

    // If the user is not verified
    if (!existingUser.emailVerified) {
      const verificationToken = await generateEmailVerificationToken(
        existingUser.email
      );
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );
      return { success: "Confirmation email sent!" };
    }

    // 2FA TODO: Implement two-factor authentication here if needed

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      return { success: "User signed in successfully!" };
    } catch (signInError) {
      if (signInError instanceof AuthError) {
        switch (signInError.type) {
          case "CredentialsSignin":
            return { error: "Invalid email or password" };
          case "AccessDenied":
            return { error: "Access denied. Please contact support." };
          default:
            return { error: "An error occurred during sign in" };
        }
      }
      throw signInError;
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    return { error: "An unexpected error occurred" };
  }
});
