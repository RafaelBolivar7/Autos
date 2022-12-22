import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {
    const{user, isAuthenticated, isLoading} = useAuth0();
    if(isLoading){
        return<div>Loading...</div>
    }

    return(
        isAuthenticated&&(
        <div className="container mt-3">
            <img src={user.picture} alt={user.nickname}/>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
        </div>
        )
    )
}