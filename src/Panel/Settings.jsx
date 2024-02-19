import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUser from "../Hooks/useUser";
import Header from "../Partials/Header";
import LeftMenu from "../Partials/LeftMenu";
import TitleAdmin from "../Partials/TitleAdmin";
import Button from "../components/Button";
import axios from "axios";
import config from "../config";
import Input from "../components/Input";
import Alert from "../components/Alert";
import styles from "./styles/Panel.module.css";

const Settings = () => {
    const { id } = useParams();
    const [triggerLoading, setTriggerLoading] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useUser(true, () => setTriggerLoading(true));
    const [btnText, setBtnText] = useState('Simpan Perubahan');
    const [theWedding, setTheWedding] = useState(null);
    const [message, setMessage] = useState(null);

    const [title, setTitle] = useState('');
    const [streamURL, setStreamURL] = useState('');
    const [timezone, setTimezone] = useState('');
    const [intro, setIntro] = useState('');

    useEffect(() => {
        if (isLoading && triggerLoading && user !== null && user !== "unauthenticated") {
            setTriggerLoading(false);
            let weddings = user.weddings;
            weddings.map(wd => {
                if (parseInt(wd.id) === parseInt(id)) {
                    setTheWedding(wd.id);
                    setTitle(wd.title);
                    setStreamURL(wd.stream_url);
                    setTimezone(wd.timezone);
                    setIntro(wd.intro);
                }
            });
        }
    }, [isLoading, triggerLoading, user]);

    const save = (e) => {
        setBtnText('Menyimpan...');
        axios.post(`${config.baseUrl}/api/user/wedding/${id}/settings`, {
            title, timezone, intro,
            stream_url: streamURL,
        })
        .then(response => {
            let res = response.data;
            setBtnText('Simpan Perubahan');
            setMessage(res.message);
        })
        .catch(e => setBtnText('Simpan Perubahan'));
        e.preventDefault();
    }

    return (
        <>
            <Header weddingID={id} weddings={user?.weddings} />
            <LeftMenu active={'settings'} weddingID={id} />
            <div className="content user">
                <TitleAdmin
                    title="Pengaturan"
                    right={
                        <Button color="green" height={40} onClick={save}>
                            {btnText}
                        </Button>
                    }
                />

                {
                    message !== null &&
                    <Alert message={message} setMessage={setMessage} />
                }

                <form onSubmit={save}>
                    <Input label="Judul Undangan" value={title} onInput={e => setTitle(e.currentTarget.value)} required />
                    <Input label="URL Live Streaming (Youtube)" value={streamURL} onInput={e => setStreamURL(e.currentTarget.value)} required />

                    <div style={{height: 40}}></div>

                    <div className={styles.Title}>Kalimat Pembuka</div>
                    <Input label="" value={intro} onInput={e => setIntro(e.currentTarget.value)} multiline />
                </form>
            </div>
        </>
    )
}

export default Settings;