import { z } from "zod";

export const registerSchema = z.object({
  identity: z.string({
    required_error: 'Tipo no valido',
  }),
  name: z.string({
    required_error: 'Nombre(s) es requerido',
  }),
  lastName: z.string({
    required_error: 'Apellidos requerido',
  }),
  phone: z.string({
    required_error: 'Celular es requerido',
  }).length(10, { message: 'No es un numero de celular valido' }),
  // birth: z.date({
  //   required_error: 'Please select a date',
  // }),
  email: z.string({
    required_error: 'Correo es requerido',
  })
    .email({
      message: "Correo invalido",
    })
});


export const clientSchema = z.object({
  id: z.number({
    required_error: 'No es un numero entero',
  })
    .nonnegative({
      message: 'No es un id valido',
    }),
  identity: z.string({
    required_error: 'Tipo no valido',
  }),
  name: z.string({
    required_error: 'Nombre(s) es requerido',
  }),
  lastName: z.string({
    required_error: 'Apellidos requerido',
  }),
  address: z.string({
    required_error: 'direccion es requerida',
  }),
  phone: z.string({
    required_error: 'Celular es requerido',
  }).length(10, { message: 'No es un numero de celular valido' })
});

const userSchema = z.object({

})

export const loginSchema = z.object({
  identity: z.string({
    required_error: 'Identificacion requerida'
  }),
  password: z.string({
    required_error: 'Contraseña requerida'
  })
    .min(6, {
      message: 'Contraseña debe tener minimo 6 caracteres'
    })
})
