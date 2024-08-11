import api from "./Api";

class UsersService {
    static async getUsers(): Promise<any>  {

        try {
           const response = await api.get('http://localhost:8080/users')
            const data = response.data;
            return data
        } catch (e) {
            console.error("erro ao buscar usuarios", {e})
            throw new Error("erro ao buscar usuarios")
        }

    }
}

export default UsersService