import { AxiosError } from "axios";
import api from "./Api";

export interface UserRequestDTO {
    username: string;
    password: string;
    admin?: boolean;
}

export interface LoginDTO {
    username: string;
    password: string;
}

export interface LoginResponseDTO {
    accessToken: string;
}

class AuthService {
    static async registerUser(user: UserRequestDTO): Promise<void> {
        try {
            await api.post('http://localhost:8080/users', user);
        } catch (error: any) {
            console.log(error.response.data)

            throw new Error(typeof error.response.data == "string" ? error.response.data : 'Erro ao se registrar');
        }
    }

    static async login(user: LoginDTO): Promise<LoginResponseDTO> {
        try {
            const response = await api.post('http://localhost:8080/login', user);
            const data = response.data;
            return { accessToken: data["accessToken"] ?? "" }
        } catch (error: any) {
            throw new Error('Erro ao se autenticar');
        }
    }
}

  export default AuthService;
