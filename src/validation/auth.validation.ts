import * as z from "zod"

export const loginValidation = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(64, "Password must be at most 64 characters."),
})



// const TouristRegistrationZodSchema =z.object({
// 	name :z.string().min(3,"Name must 3 characters long !!!").max(10),
// 	email:z.email("Not email"),
// 	password: z.string().min(8, "Password Must Minimum 8 Characters Long.")
// 	.regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter"),
// 	patient: z.object({
// 		contactNumber: z.string().optional(),
// 		age:z.string()

// 	}).optional()
// })

export const touristRegistrationSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name too long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Must contain at least 1 number"),
})

export type LoginInput = z.infer<typeof loginValidation>

export type RegistrationInput=z.infer<typeof touristRegistrationSchema>