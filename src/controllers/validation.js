import {z} from "zod"


export const userSchema = z.object({
  email: z.string().email({ message: "Correo electrónico no válido" }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
  username: z.string().max(8, {message : "8 caracteres maximos"})
});

