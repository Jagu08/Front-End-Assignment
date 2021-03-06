import React from "react";
import Header from "./Header";
import Loader from "../Component/Loader";

function Layout(props) {
    return (
        <div>
        {props.loading && <Loader/>}
            <Header/>
            <div className="content">
                {props.children}
            </div>
        </div>
    );
}

export default Layout;