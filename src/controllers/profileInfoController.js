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


import { insertUser, updateUserData, getUser } from "../models/UsuariosModel.js";
import { supabase } from "../configs/databaseConfig.js";

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

export const getUserById = async (user_id) => {
	try {
	  console.log('Entrando en getUserById');
	  const { data, error } = await supabase
		.from("personalinformation")
		.select("*")
		.eq("id", user_id)
		.single();
  
	  console.log('Resultado de getUserById:', data);
  
	  if (error) {
		console.error('Error al obtener el usuario por ID:', error);
		throw error;
	  }
  
	  if (!data) {
		console.error('Usuario no encontrado');
		throw new Error("Usuario no encontrado");
	  }
  
	  return data;
	} catch (error) {
	  console.error("Error al obtener el usuario por ID:", error);
	  throw new Error("DB: Error fetching user data by ID");
	}
  };
  
  

export async function updateUserProfile(id, username, name, cedula, tel1, tel2, address1, address2) {
	try {
	  let newData = {};
  
	  if (name) newData["name"] = name;
	  if (username) newData["username"] = username;
	  if (cedula) newData["cedula"] = cedula;
	  if (tel1) newData["tel1"] = tel1;
	  if (tel2) newData["tel2"] = tel2;
	  if (address1) newData["address1"] = address1;
	  if (address2) newData["address2"] = address2;
  
	  await updateUserData(newData, id);
  
	  return;
	} catch (error) {
	  throw new Error(`Error al actualizar el perfil: ${error.message}`);
	}
  }
