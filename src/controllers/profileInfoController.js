/**
 * Controladores para el manejo de los datos del perfil de los usuarios
 */

// Actualizar Datos editables en el perfil de un usuario
/**
 * Envia un json stado acorde y con un string.
 * {status: 280, Perfil actualizado correctamente}
 * {status: 480, "Las contraseña actual no es valida"}
 * 
 */

import { insertUser } from "../models/UsuariosModel.js";

export async function registerUser(username, name,  cedula, tel1, tel2, address1, address2) {
	return new Promise(async (resolve, reject) => {
		try {
			const data = await insertUser(username, name,  cedula, tel1, tel2, address1, address2);
			console.log("data", data);

			resolve("OK");
		} catch (error) {
			console.error("Error al crear el usuario:", error);

			// Rechaza la promesa con el error
			reject(error);
			// res.status(500).json({ error: error.message });
		}
	});
}

export async function updateUserProfile(req, res) {
	const user_id = req.personalinformation.id;

	const {
		nombre_usuario,
		nickname,
		tel1,
		tel2,
		address1,
		address2
	} = req.body;

	newData = {};
	if (nombre_usuario) newData["nombre_usuario"] = nombre_usuario;
	if (nickname) newData["nickname"] = nickname;
	if (tel1) newData["tel1"] = tel1;
	if (tel2) newData["tel2"] = tel2;
	if (address1) newData["address1"] = address1;
	if (address2) newData["address2"] = address2;
	
	await updateUserData(newData, user_id);

	res.status(280).json("Perfil actualizado correctamente");
	return;
}
