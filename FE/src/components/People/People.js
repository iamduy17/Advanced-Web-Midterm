import { Avatar } from "@material-ui/core";
import "./People.css"
import Person from "./Person";


function People() {
    const owners = ["Owner1", "Owner2", "Owner3"]
    const co_owners = ["Co-Owner1", "Co-Owner2", "Co-Owner3"]
    const members = ["Member1", "Member2", "Member3"]
    return (
        
        <div className="container">
            <div className="role-item">
                <h1 className="title">Owner</h1>
                <hr className="divider"></hr>
                {owners.map(item=><Person name={item}></Person>)}
                
            </div>
            <div className="role-item">
                <h1 className="title">Co-Owner</h1>
                <hr className="divider"></hr>
                {co_owners.map(item=><Person name={item}></Person>)}
            </div>
            <div className="role-item">
                <h1 className="title">Member</h1>
                <hr className="divider"></hr>
                {members.map(item=><Person name={item}></Person>)}
            </div>
        </div>
    )
}

export default People;

