import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUser from "../Hooks/useUser";
import Header from "../Partials/Header";
import LeftMenu from "../Partials/LeftMenu";
import TitleAdmin from "../Partials/TitleAdmin";
import axios from "axios";
import config from "../config";
import Button from "../components/Button";
import Popup from "../components/Popup";
import { BiPhone, BiTrash, BiUser, BiX } from "react-icons/bi";
import Input from "../components/Input";
import Alert from "../components/Alert";

const Guest = () => {
    const { id } = useParams();
    const [triggerLoading, setTriggerLoading] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useUser(true, () => setTriggerLoading(true));
    const [message, setMessage] = useState(null);

    const [theWedding, setTheWedding] = useState(null);
    const [raw, setRaw] = useState(null);
    const [guests, setGuests] = useState([]);
    const [guest, setGuest] = useState(null);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [addBtn, setAddBtn] = useState('Tambahkan');
    const [delBtn, setDelBtn] = useState(`Ya, Hapus ${guest?.name}`);

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.get(`${config.baseUrl}/api/user/wedding/${id}/guest`, {
                headers: {
                    "UserToken": user.token,
                }
            })
            .then(response => {
                let res = response.data;
                setLoading(false);
                setRaw(res.guests);
                setGuests(res.guests.data);

                user.weddings.map(wedd => {
                    if (parseInt(wedd.id) == id) {
                        setTheWedding(wedd);
                    }
                })
            })
        }
    }, [isLoading, triggerLoading]);

    const resetForm = (message = null) => {
        setMessage(message);
        setLoading(true);
        setTriggerLoading(true);
        setName('');
        setPhone('');
    }
    const submit = e => {
        axios.post(`${config.baseUrl}/api/user/wedding/${id}/guest/store`, {
            name, phone,
            wedding_id: id
        })
        .then(response => {
            resetForm(response.data.message);
            setAdding(false);
        })
        e.preventDefault();
    }
    const del = e => {
        setDelBtn(`Menghapus ${guest?.name}...`);
        axios.post(`${config.baseUrl}/api/user/wedding/${id}/guest/delete`, {
            guest_id: guest.id,
        })
        .then(response => {
            resetForm(response.data.message);
            setDeleting(false);
        })
        e.preventDefault();
    }

    return (
        <>
            <Header weddingID={id} weddings={user?.weddings} page="guest" />
            <LeftMenu active={'guest'} weddingID={id} />
            {
                !isLoading &&
                <div className="content user">
                    <TitleAdmin
                        title="Daftar Tamu"
                        description={`Orang-orang yang diundang ke ${theWedding?.title}`}
                        right={
                            <Button accent="secondary" onClick={() => setAdding(true)}>
                                Tambah
                            </Button>
                        }
                    />

                    {
                        message !== null &&
                        <Alert message={message} setMessage={setMessage} />
                    }

                    <table>
                        <thead>
                            <tr>
                                <th><BiUser /></th>
                                <th><BiPhone /></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                guests.map((gue, g) => (
                                    <tr key={g}>
                                        <td>{gue.name}</td>
                                        <td>{gue.phone}</td>
                                        <td>
                                            <Button height={32} color="red" accent="secondary" onClick={() => {
                                                setGuest(gue);
                                                setDelBtn(`Ya, Hapus ${gue.name}`);
                                                setDeleting(true);
                                            }}>
                                                <BiTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }

            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <TitleAdmin
                        title="Tambah Tamu"
                        right={
                            <Button circle color="muted" accent="secondary" onClick={() => setAdding(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <form onSubmit={submit}>
                        <Input label="Nama" value={name} onInput={e => setName(e.currentTarget.value)} required icon={<BiUser />} />
                        <Input label="No. Whatsapp" value={phone} onInput={e => setPhone(e.currentTarget.value)} required icon={'+62'} />

                        <Button style={{width: '100%'}}>Tambahkan</Button>
                    </form>
                </Popup>
            }
            
            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <TitleAdmin
                        title="Hapus Tamu"
                        right={
                            <Button circle color="muted" accent="secondary" onClick={() => setDeleting(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <form onSubmit={del}>
                        <div>Yakin ingin menghapus {guest.name} dari daftar tamu? Tindakan ini tidak dapat dipulihkan</div>

                        <Button style={{width: '100%'}} color="red">{delBtn}</Button>
                        <Button style={{width: '100%'}} color="muted" accent="secondary" type="button" onClick={() => setDeleting(false)}>batalkan</Button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default Guest;