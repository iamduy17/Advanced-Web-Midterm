import React from "react";
import "./style.css"

const Loader = () => {
    return (
        <>
            <div className="loader__spinner">
                <div className="loader__circle loader__one"></div>
                <div className="loader__circle loader__two"></div>
                <div className="loader__circle loader__three"></div>
            </div>
        </>
    )
}

export default Loader;