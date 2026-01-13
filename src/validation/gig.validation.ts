import z from "zod";

const createGigValidationSchema = z.object({
  title: z
    .string("Title is required")
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title must not exceed 100 characters")
    .trim(),
  description: z
    .string("Description is required")
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description must not exceed 1000 characters")
    .trim(),
  budget: z
    .number("Budget is required")
    .positive("Budget must be a positive number")
    .min(1, "Budget must be at least 1"),
  deadline: z.string("Deadline is required").refine(
    (date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    },
    { message: "Deadline must be today or in the future" }
  ),
});

export { createGigValidationSchema };