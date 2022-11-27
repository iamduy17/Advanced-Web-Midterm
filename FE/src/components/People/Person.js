import { Avatar, CardHeader } from "@material-ui/core";
import "./Person.css"
import { Link } from "react-router-dom"

function Person({ id, name }) {
    return (
        <Link to={`/profile/${id}`}>
            <CardHeader className="person"
                avatar={
                    <Avatar />
                }
                title={name}>
            </CardHeader>
        </Link>
    )
}

export default Person;

