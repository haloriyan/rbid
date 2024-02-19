import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUser from "../Hooks/useUser";
import Header from "../Partials/Header";
import LeftMenu from "../Partials/LeftMenu";

const Dashboard = () => {
    const { id } = useParams();
    const [triggerLoading, setTriggerLoading] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useUser(true, () => setTriggerLoading(true));

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
        }
    }, [isLoading, triggerLoading]);

    return (
        <>
            <Header weddingID={id} weddings={user?.weddings} />
            <LeftMenu active={'dashboard'} weddingID={id} />
            <div className="content user">
                sdsds
            </div>
        </>
    )
}

export default Dashboard;