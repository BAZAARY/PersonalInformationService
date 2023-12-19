import {
	registerUser,
	updateUserProfile,
	getUserById
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

extend type Query {
    userById(id: ID!): User
}

type User @key(fields: "id") {
	id: ID
	name: String
	username: String
	cedula: String
	tel1: String
	tel2: String
	address1: String
	address2: String
}

#INPUTS

input UserInfoInput {
	name: String!
	username: String!
	cedula: String!
	tel1: String!
	tel2: String
	address1: String!
	address2: String
}

#LO QUE RETORNA AL GATEWAY/FRONTEND

type RegistrationResult {
	message: String!
}

type Mutation {
	registerInfoUser(input: UserInfoInput!): RegistrationResult!
	updateUserProfile(
		id: ID!
		name: String
		username: String
		cedula: String
		tel1: String
		tel2: String
		address1: String
		address2: String
	  ): String
}
`;

// Define los resolutores
export const resolvers = {

	Query: {
		users: async () => {
			console.log("AAAAAAAAAAAAAAAA");
			try {
				const data = await getUsers();
				console.log("------------->", data[0]);
				return data[0];
			} catch (error) {
				throw new Error(`Error al obtener los usuarios: ${error}`);
			}
		},

		userById: async (_, { id }) => {
			try {
			  const user = await getUserById(id);
			  return user;
			} catch (error) {
			  throw new Error(`Error al obtener el usuario por ID: ${error.message}`);
			}
		  },
	},

	Mutation: {

		registerInfoUser: async (_, { input }) => {
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
			const { id, username, name, cedula, tel1, tel2, address1, address2 } = args;
		
			try {
			  // Llama a la función updateUserProfile con los argumentos proporcionados
			  await updateUserProfile(id, username, name, cedula, tel1, tel2, address1, address2);
		
			  // Retorna un mensaje indicando que el perfil se ha actualizado correctamente
			  return "Perfil actualizado correctamente";
			} catch (error) {
			  throw new Error(`Error al actualizar el perfil: ${error.message}`);
			}
		  },
	},
};