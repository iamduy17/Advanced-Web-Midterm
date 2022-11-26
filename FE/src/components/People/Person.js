import { Avatar, CardHeader } from "@material-ui/core";
import "./Person.css"

function Person({ name }) {
    return (
        <CardHeader className="person"
            avatar={
                <Avatar/>
            }
            title={name}>
        </CardHeader>

    )
}

export default Person;

