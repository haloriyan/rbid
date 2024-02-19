import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../Hooks/useUser";

const UserMiddleware = ({children}) => {
    // const [admin, setAdmin] = useState(null);
    const [user, setUser] = useUser(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null || user === 'unauthenticated') {
            navigate('/login');
        }
    }, [user]);

    if (user !== null) {
        return children;
    }
}

export default UserMiddleware;