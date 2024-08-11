import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import "./styles.css"
import AuthService, { LoginResponseDTO } from "../../services/AuthService"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
export default function LoginPage () {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMsg, setErrorMsg] = useState<string>("")
    const { login, logout } = useAuth();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.has('logout')) {
            logout();
        }
    }, [logout]);


    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        setErrorMsg("");
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrorMsg("");
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMsg("");

        try {
           const response: LoginResponseDTO  = await AuthService.login({username, password})
           login(response.accessToken);
        } catch (e: any) {
            setErrorMsg(e.message)
        }
    }

    return (
        <>
        <h1 style={{textAlign: "center"}}>Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
                <input type="text" placeholder="Password" value={password} onChange={handlePasswordChange} />
                <button type="submit">Entrar</button>
                <Link to={"/register"}>Criar conta</Link>
                <span className="error-msg">{errorMsg}</span>
            </form>
        </>)
}