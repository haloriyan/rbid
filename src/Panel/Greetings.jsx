import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUser from "../Hooks/useUser";
import Header from "../Partials/Header";
import LeftMenu from "../Partials/LeftMenu";
import TitleAdmin from "../Partials/TitleAdmin";
import styles from "./styles/Gallery.module.css";
import axios from "axios";
import config from "../config";
import Button from "../components/Button";
import { BiTrash, BiX } from "react-icons/bi";
import Popup from "../components/Popup";
import Alert from "../components/Alert";

const Greetings = () => {
    const { id } = useParams();
    const [triggerLoading, setTriggerLoading] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useUser(true, () => setTriggerLoading(true));
    const [greetings, setGreetings] = useState([]);
    const [greeting, setGreeting] = useState(null);
    const [isDeleting, setDeleting] = useState(false);
    const [delBtn, setDelBtn] = useState('Hapus Ucapan');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.get(`${config.baseUrl}/api/user/wedding/${id}/greetings`)
            .then(response => {
                let res = response.data;
                setLoading(false);
                setGreetings(res.greetings);
            })
        }
    }, [isLoading, triggerLoading]);

    const del = e => {
        setDelBtn('Menghapus...');
        axios.post(`${config.baseUrl}/api/user/wedding/${id}/greetings/delete`, {
            greeting_id: greeting.id,
        })
        .then(response => {
            setDelBtn('Hapus Ucapan');
            setLoading(true);
            setTriggerLoading(true);
            setDeleting(false);
        })
        .catch(e => setDelBtn('Hapus Ucapan'));
        e.preventDefault();
    }

    return (
        <>
            <Header weddingID={id} weddings={user?.weddings} />
            <LeftMenu active={'greetings'} weddingID={id} />
            <div className="content user">
                <TitleAdmin
                    title="Ucapan & Doa"
                    description="Ucapan yang dikirimkan oleh orang-orang"
                />

                {
                    message !== null &&
                    <Alert message={message} setMessage={setMessage} />
                }

                <div className={styles.Container}>
                    {
                        greetings.map((greet, g) => (
                            <div key={g} className={styles.GreetingItem}>
                                <div className={styles.GreetingName}>{greet.name}</div>
                                <div className={styles.GreetingBody}>{greet.body}</div>
                                <div className={styles.GreetingButtons}>
                                    <Button circle color="red" height={32} onClick={() => {
                                        setGreeting(greet);
                                        setDeleting(true);
                                    }}>
                                        <BiTrash />
                                    </Button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <TitleAdmin
                        title="Hapus Ucapan"
                        right={
                            <Button circle color="muted" accent="secondary" onClick={() => setDeleting(false)}>
                                <BiX />
                            </Button>
                        }
                    />
                    <form onSubmit={del}>
                        <div>Yakin ingin menghapus ucapan dari {greeting.name}?</div>
                        <Button>{delBtn}</Button>
                        <Button type="button" color="muted" accent="secondary" onClick={() => setDeleting(false)}>batalkan</Button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default Greetings;