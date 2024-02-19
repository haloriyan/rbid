import React, { useEffect, useState } from "react";
import Header from "../Partials/Header";
import styles from "./styles/Home.module.css";
import OnBoarding from "../Partials/OnBoarding";
import axios from "axios";
import config from "../config";
import useUser from "../Hooks/useUser";
import { BiCopy, BiUser } from "react-icons/bi";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [triggerLoading, setTriggerLoading] = useState(false);
    const [user, setUser] = useUser(true, () => setTriggerLoading(true));
    const [weddings, setWeddings] = useState([]);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            console.log('loading');
            axios.get(`${config.baseUrl}/api/user/wedding`, {
                headers: {
                    'UserToken': user.token,
                }
            })
            .then(response => {
                let res = response.data;
                setLoading(false);
                setWeddings(res.weddings);
            })
        }
    }, [isLoading, triggerLoading]);

    return (
        <>
            <Header />
            {
                !isLoading &&
                <div className="content">
                    {
                        weddings.length === 0 ?
                            <div className={styles.Container}><OnBoarding /></div>
                        :
                        <div className="inner_content">
                            <div className={styles.Title}>Undangan Saya</div>
                            <div className={styles.Area}>
                                {
                                    weddings.map((wedd, w) => (
                                        <div key={w} className={styles.Item}>
                                            <div className={styles.CardTitle}>{wedd.title}</div>
                                            <div className={styles.CardInfo}>
                                                <BiUser /> {wedd.groom_name} - {wedd.bride_name}
                                            </div>

                                            <div className={styles.CardAction}>
                                                <Button height={36} accent="tertiary" onClick={() => navigate(`/panel/${wedd.id}/dashboard`)}>
                                                    Manage
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Home;