import {TableComponent} from "./TableComponent";
import React from "react";
import {Link} from "react-router-dom";

export const HomeComponent = () => {
    return (
        <div>
            {/*<button type="button" className="btn btn-primary">Add Restaurant</button>*/}
            <Link className="btn btn-primary mb-3 mt-3" to="/create">Add Restaurant</Link>
            <TableComponent/>
        </div>
    )
}
