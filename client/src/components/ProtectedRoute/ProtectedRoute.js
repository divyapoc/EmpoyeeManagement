import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export { PrivateRoute };

function PrivateRoute({ children }) {
const {userToken} = useSelector((state)=>state.auth)

if (!userToken) {
    return <Navigate to="/" />
}
return children;
}