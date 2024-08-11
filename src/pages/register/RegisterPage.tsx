import { ChangeEvent, FormEvent, useState } from "react"
import "./styles.css"
import { Link } from "react-router-dom"
import AuthService from "../../services/AuthService"

export default function RegisterPage () {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMsg, setErrorMsg] = useState<string>("")


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
            await AuthService.registerUser({username, password})
        } catch (e: any) {
            setErrorMsg(e.message)
        }
    }

    return (
    <>
        <h1 style={{textAlign: "center"}}>Register</h1>
    <form className="login-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
            <input type="text" placeholder="Password" value={password} onChange={handlePasswordChange} />
            <button type="submit">Criar conta</button>
            <Link to={"/login"}>Entrar na minha conta</Link>

            <span className="error-msg">{errorMsg}</span>
        </form>
    </>)
}