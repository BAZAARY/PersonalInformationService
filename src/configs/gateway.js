import {
	registerUser,
	updateUserProfile,
} from "../controllers/profileInfoController.js";
import { gql } from "apollo-server-express";
import { getUserByUserName } from "../models/UsuariosModel.js";


// Define tus tipos personalizados si los tienes
// Puedes definirlos aquí o importarlos desde otros archivos

// Define tus entradas (inputs) personalizadas si las tienes
// Puedes definirlas aquí o importarlas desde otros archivos

// Define el esquema GraphQL
export const typeDefs = gql`
 
extend type Query {
	users: User
	registerUser: RegistrationResult
}

type User @key(fields: "id_usuario") {
	id_usuario: ID
	email: String
	nombre_usuario: String
	contrasena: String
}

#INPUTS

input UserInput {
	name: String!
	username: String!
	cedula: String!
	tel1: String!
	tel2: String
	address1: String!
	address2: String
}

input CredentialLoginGoogle {
	clientId: String!
	credential: String!
}

#LO QUE RETORNA AL GATEWAY/FRONTEND

type RegistrationResult {
	message: String!
}

type LoginResult {
	user: User
	token: String
	message: String
}

type LoginGoogleResult {
	user: User
	token: String
	message: String
}

type Mutation {
	registerUser(input: UserInput!): RegistrationResult!
	loginUser(input: UserInput!): LoginResult
	loginGoogleUser(input: CredentialLoginGoogle!): LoginGoogleResult
}
`;

// Define los resolutores
export const resolvers = {

	Mutation: {

		registerUser: async (_, { input }) => {
			try {
				const { name, username, cedula, tel1, tel2, address1, address2 } = input;

				const message = await registerUser(name, username, cedula, tel1, tel2, address1, address2);
				// console.log("message", message);

				return { message };
			} catch (error) {
				throw new Error(`Error al registrar el usuario: ${error.message}`);
			}
		},


		updateUserProfile: async (_, args) => {
			// Llama a la función updateUserProfile con los argumentos proporcionados
			const { nombre_usuario, nickname, tel1, tel2, address1, address2 } = args;
			// Debes manejar la respuesta de updateUserProfile según tu implementación
			// Aquí asumimos que retorna una cadena "Perfil actualizado correctamente"
			return updateUserProfile({
				nombre_usuario,
				nickname,
				tel1,
				tel2,
				address1,
				address2,
			})
				.then(() => "Perfil actualizado correctamente")
				.catch((error) => {
					throw new Error(`Error al actualizar el perfil: ${error.message}`);
				});
		},
	},
};
