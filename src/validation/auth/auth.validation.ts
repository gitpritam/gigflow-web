import z from "zod";

export const signinValidationSchema = z.object({
  email: z
    .email("Invalid email format")
    .min(1, "Email is required")
    .trim()
    .toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export const signupValidationSchema = z
  .object({
    name: z
      .string("Name is required")
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must not exceed 50 characters")
      .trim(),
    email: z
      .email("Invalid email format")
      .min(1, "Email is required")
      .trim()
      .toLowerCase(),
    password: z
      .string("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        "Password must contain at least one letter and one number"
      ),

    confirmPassword: z.string("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });
