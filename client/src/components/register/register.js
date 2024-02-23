
export const handleSubmit = async (values) => {
  const userWithId = { ...values };

    // Añadir el atributo id (puedes asignar un valor específico o generarlo)
    userWithId.id = "tu_valor_o_generador_id_aqui";

    console.log(userWithId);

    // Enviar el objeto modificado al backend
    const res = await registerRequest(userWithId);
    console.log(res);
}