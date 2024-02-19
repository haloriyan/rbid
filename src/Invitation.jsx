import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "./config";
import Loader from "./Partials/Loader";
import Templates from "./Templates";

const Invitation = () => {
    const { slug, code } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(true);
    const [isLoadingStyle, setLoadingStyle] = useState(true);
    const [wedding, setWedding] = useState(null);
    const [guest, setGuest] = useState(null);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            let endpoint = `${config.baseUrl}/api/wedding/${slug}`;
            if (code !== undefined) {
                endpoint = `${config.baseUrl}/api/wedding/${slug}?guest_code=${code}`;
            }
            axios.get(endpoint)
            .then(response => {
                let res = response.data;
                setLoading(false);
                setGuest(res.guest);
                setWedding(res.wedding);
            })
        }
    }, [isLoading, triggerLoading]);

    useEffect(() => {
        if (!isLoading && wedding !== null && isLoadingStyle) {
            setLoadingStyle(false);
            let head = document.querySelector('head');
            const link = document.createElement('link');
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = `/Templates/${wedding.template.toUpperCase()}/Style.css`;
            head.appendChild(link);

            // return () => head.removeChild(link)
        }
    }, [isLoading, isLoadingStyle, wedding]);

    if (!isLoading && !isLoadingStyle) {
        return Templates(wedding, guest)
    } else {
        return <Loader />
    }
}

export default Invitation;