/**
 * MANEJO DE LAS SOLICITUDES A LA BASE DE DATOS DE LA TABLA DE "usuarios"
 */
import { supabase } from "../configs/databaseConfig.js";

// Realizar la consulta para obtener todos los datos del usuario en la base de datos

export const getUsers = async () => {
	try {
		// Seleccionar todos los usuarios de la base de datos con todos sus atributos
		const { data, error: queryError } = await supabase.from("personalinformation").select("*");

		//Si hay un error durante la consulta
		if (queryError) {
			throw new Error(queryError.message);
		}

		return data;
	} catch (error) {
		throw new Error("DB: Error fetching users");
	}
};

export const insertUser = async (username, name,  cedula, tel1, tel2, address1, address2) => {
	try {
		// Guardar los datos adicionales del usuario en la tabla 'usuarios'
		const { data, error: insertError } = await supabase
			.from("personalinformation")
			.insert([{ username, name, cedula, tel1, tel2, address1, address2 }]);

		//Si hay un error durante la insercion de los datos del usuario
		if (insertError) {
			throw new Error(insertError.message);
		}
		return data;
	} catch (error) {
		console.log(error)
		throw new Error("DB: Error inserting user");
	}
};


export const updateUserData = async (newData, id_usuario) => {
	try {
		const { data, error } = await supabase
			.from("personalinformation")
			.update(newData)
			.eq("id", id_usuario);

		//Si hay un error
		if (error) {
			throw new Error(error.message);
		}

		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const getUserByUserName = async (username) => {
	try {
		const { data, error } = await supabase.from("usuarios").select("*").eq("username", username).single();

		if (error) {
			throw error;
		}

		return data;
	} catch (error) {
		throw new Error("DB: Error fetching user data");
	}
};
