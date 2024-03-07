import { z } from "zod";

// export const registerSchema = z.object({
//   id: z.number({
//     required_error: 'No es un numero entero',
//   })
//   .nonnegative({
//     message: 'No es un id valido',
//   }),
//   identity: z.string({
//     required_error: 'Tipo no valido',
//   }),
//   name: z.string({
//     required_error: 'Nombre(s) es requerido',
//   }),
//   lastName: z.string({
//     required_error: 'Apellidos requerido',
//   }),
//   address: z.string({
//     required_error: 'direccion es requerida',
//   }),
//   phone: z.string({
//     required_error: 'Celular es requerido',
//   }).length(10, {message: 'No es un numero de celular valido'}),
//   state: z.boolean({
//     required_error: 'Se espera valor booleano',
//   }),
//   birth: z.date({
//     required_error: 'Please select a date',
//   }),
//   email: z.string({
//     required_error: 'Correo es requerido',
//   })
//   .email({
//     message: "Correo invalido",
//   }),
//   role: z.number({
//     required_error: 'Debe ser un numero entero positivo',
//   }).positive({ message: 'No existe role con este numero'})
// });

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
  }).length(10, {message: 'No es un numero de celular valido'}),
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
  }).length(10, {message: 'No es un numero de celular valido'})
});

const userSchema = z.object({
  
})

export const loginSchema = z.object({
  user: z.string({
    required_error: 'Identificacion requerida'
  }),
  password: z.string({
    required_error: 'Contraseña requerida'
  })
  .min(6, {
    message: 'Contraseña debe tener minimo 6 caracteres'
  })
})

// * Usuario * 
// let data = {
//   id: body.id,
//   info: {
//     ID_USUARIO: body.id,
//     ESTADO_USUARIO: body.state,
//     NACIMIENTO: body.birth,
//     CORREO: body.email,
//     FK_ID_REGISTRO_ROL: body.registerRole
//   }
// }

// * Persona *
// let data = {
//   id: body.id,
//   info: {
//     identificacion: body.identity,
//     nombre: body.name,
//     apellido: body.lastName,
//     celular: body.phone,
//     direccion: body.address
//   }
// }

// * Auth *
// const authData = {
//   id: data.user,
//   info: {
//       pass_auth: pass
//   }
// }
