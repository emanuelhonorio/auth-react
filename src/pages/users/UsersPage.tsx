import { useEffect, useState } from "react";
import UsersService from "../../services/UsersService";
import "./styles.css"

export default function UsersPage() {

    const [users, setUsers] = useState<[{username: string, permissions: string[]}] | []>([])

    useEffect(() => {
        UsersService.getUsers().then((data) => {
            setUsers(data)
        })
    }, [])
    

    return <>
        <table border={1}>
            <tr>
                <th>#</th>
                <th>Username</th>
                <th>Roles</th>
            </tr>
            {
                users?.map(user => (
                    <tr>
                        <td width="50px">#</td>
                        <td>{user.username}</td>
                        <td width="200px">{user.permissions.map(p => (<div className={"permission " + p}>{p.split("_")[1]}</div>))}</td>
                    </tr>
                ))
            }
        </table>
    </>
}