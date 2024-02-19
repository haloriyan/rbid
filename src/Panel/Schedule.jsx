import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUser from "../Hooks/useUser";
import Header from "../Partials/Header";
import LeftMenu from "../Partials/LeftMenu";
import axios from "axios";
import config from "../config";
import TitleAdmin from "../Partials/TitleAdmin";
import Button from "../components/Button";
import { BiEdit, BiTime, BiTrash, BiX } from "react-icons/bi";
import moment from "moment";
import Popup from "../components/Popup";
import Input from "../components/Input";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import Alert from "../components/Alert";

const inputStyles = Input({exportStyles: true});
const InputContainer = ({children}) => {
    return (
        <div className={inputStyles.styles.Wrapper}>
            <div className={inputStyles.styles.Area}>
                {children}
            </div>
            {inputStyles.bottomLine}
        </div>
    )
}

const Schedule = () => {
    const { id } = useParams();
    const [triggerLoading, setTriggerLoading] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useUser(true, () => setTriggerLoading(true));
    const [schedules, setSchedules] = useState([]);
    const [schedule, setSchedule] = useState(null);
    const [theWedding, setTheWedding] = useState(null);

    const [title, setTitle] = useState('After Party');
    const [address, setAddress] = useState('Jl. Bumiarjo V No. 11');
    const [gmapLink, setGmapLink] = useState('https://maps.app.goo.gl/kEfF67iTzRzbn9kV9');
    const [message, setMessage] = useState(null);
    const [date, setDate] = useState(moment(new Date()).format('Y-MM-DD'));
    const [time, setTime] = useState(moment(new Date()).format('HH:mm'));

    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [addBtn, setAddBtn] = useState('Tambahkan Acara');
    const [delBtn, setDelBtn] = useState('Hapus Acara');
    const [editBtn, setEditBtn] = useState('Simpan Perubahan');

    useEffect(() => {
        if (isLoading && triggerLoading) {
            setTriggerLoading(false);
            axios.get(`${config.baseUrl}/api/user/wedding/${id}/schedule`)
            .then(response => {
                let res = response.data;
                setLoading(false);
                setSchedules(res.schedules);

                let weddings = user.weddings;
                weddings.map(wd => {
                    if (parseInt(wd.id) === parseInt(id)) {
                        setTheWedding(wd);
                    }
                })
            })
        }
    }, [isLoading, triggerLoading]);

    const resetForm = (message = null) => {
        setMessage(message);
        setTitle('');
        setAddress('');
        setGmapLink('');
        setLoading(true);
        setDate(new Date());
        setTriggerLoading(true);
    }

    const submit = e => {
        setAddBtn('Menambahkan...');
        axios.post(`${config.baseUrl}/api/user/wedding/${id}/schedule/store`, {
            title, address, date, time,
            gmaps_link: gmapLink,
        })
        .then(response => {
            resetForm(response.data.message);
            setAdding(false);
            setAddBtn('Tambahkan Acara');
        })
        .catch(e => setAddBtn('Tambahkan Acara'));
        e.preventDefault();
    }
    const del = e => {
        setDelBtn('Menghapus...');
        axios.post(`${config.baseUrl}/api/user/wedding/${id}/schedule/delete`, {
            schedule_id: schedule.id,
        })
        .then(response => {
            resetForm(response.data.message);
            setDeleting(false);
            setDelBtn('Hapus Acara');
        })
        e.preventDefault();
    }
    const update = e => {
        setEditBtn('Menyimpan...');
        axios.post(`${config.baseUrl}/api/user/wedding/${id}/schedule/update`, {
            schedule_id: schedule.id,
            title, address, date, time,
            gmaps_link: gmapLink,
        })
        .then(response => {
            resetForm(response.data.message);
            setEditing(false);
            setEditBtn('Simpan Perubahan');
        })
        .catch(e => setEditBtn('Simpan Perubahan'));
        e.preventDefault();
    }

    return (
        <>
            <Header weddingID={id} weddings={user?.weddings} />
            <LeftMenu active={'schedule'} weddingID={id} />
            <div className="content user">
                <TitleAdmin
                    title="Jadwal Acara"
                    description="Daftar acara yang akan diadakan pada hari pernikahan"
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
                            <th>Acara</th>
                            <th><BiTime /></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            schedules.map((sched, s) => (
                                <tr key={s}>
                                    <td>{sched.title}</td>
                                    <td>{moment(sched.date).format('DD MMM Y - HH:mm')} {config.timezones[theWedding.timezone]}</td>
                                    <td className="inline">
                                        <Button height={32} color="green" accent="secondary" onClick={() => {
                                            setSchedule(sched);
                                            setTitle(sched.title);
                                            setAddress(sched.address);
                                            setGmapLink(sched.gmaps_link);
                                            setEditing(true);
                                        }}>
                                            <BiEdit />
                                        </Button>
                                        <Button height={32} color="red" accent="secondary" onClick={() => {
                                            setSchedule(sched);
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

            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <TitleAdmin
                        title="Tambah Jadwal Acara Baru"
                        right={
                            <Button circle color="muted" accent="secondary" onClick={() => setAdding(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <form onSubmit={submit}>
                        <Input label="Judul Acara" value={title} onInput={e => setTitle(e.currentTarget.value)} required />
                        <div className="inline">
                            <div style={{display: 'flex',flexGrow: 1,flexDirection: 'column',gap: 10}}>
                                <div style={{fontSize: 12,color: '#666'}}>Tanggal</div>
                                <InputContainer>
                                    <Flatpickr
                                        style={{height: 40}}
                                        value={date}
                                        options={{
                                            dateFormat: 'Y-m-d',
                                        }}
                                        onChange={([theDate]) => {
                                            let dt = moment(theDate);
                                            setDate(dt.format('Y-MM-DD'));
                                        }}
                                    />
                                </InputContainer>
                            </div>
                            <div style={{display: 'flex',flexGrow: 1,flexDirection: 'column',gap: 10}}>
                                <div style={{fontSize: 12,color: '#666'}}>Waktu</div>
                                <InputContainer>
                                    <Flatpickr
                                        style={{height: 40}}
                                        value={time}
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: 'H:i',
                                        }}
                                        onChange={([theTime]) => {
                                            let dt = moment(theTime);
                                            setTime(dt.format('HH:mm'));
                                        }}
                                    />
                                </InputContainer>
                            </div>
                        </div>
                        <Input label="Alamat Lokasi" value={address} onInput={e => setAddress(e.currentTarget.value)} required multiline />
                        <Input label="Link Google Maps" value={gmapLink} onInput={e => setGmapLink(e.currentTarget.value)} required={false} placeholder={'https://'} />

                        <Button>{addBtn}</Button>
                    </form>
                </Popup>
            }
            {
                isEditing &&
                <Popup onDismiss={() => setEditing(false)}>
                    <TitleAdmin
                        title="Ubah Jadwal Acara"
                        right={
                            <Button circle color="muted" accent="secondary" onClick={() => setEditing(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <form onSubmit={update}>
                        <Input label="Judul Acara" value={title} onInput={e => setTitle(e.currentTarget.value)} required />
                        <div className="inline">
                            <div style={{display: 'flex',flexGrow: 1,flexDirection: 'column',gap: 10}}>
                                <div style={{fontSize: 12,color: '#666'}}>Tanggal</div>
                                <InputContainer>
                                    <Flatpickr
                                        style={{height: 40}}
                                        value={date}
                                        options={{
                                            dateFormat: 'Y-m-d',
                                        }}
                                        onChange={([theDate]) => {
                                            let dt = moment(theDate);
                                            setDate(dt.format('Y-MM-DD'));
                                        }}
                                    />
                                </InputContainer>
                            </div>
                            <div style={{display: 'flex',flexGrow: 1,flexDirection: 'column',gap: 10}}>
                                <div style={{fontSize: 12,color: '#666'}}>Waktu</div>
                                <InputContainer>
                                    <Flatpickr
                                        style={{height: 40}}
                                        value={time}
                                        options={{
                                            enableTime: true,
                                            noCalendar: true,
                                            dateFormat: 'H:i',
                                        }}
                                        onChange={([theTime]) => {
                                            let dt = moment(theTime);
                                            setTime(dt.format('HH:mm'));
                                        }}
                                    />
                                </InputContainer>
                            </div>
                        </div>
                        <Input label="Alamat Lokasi" value={address} onInput={e => setAddress(e.currentTarget.value)} required multiline />
                        <Input label="Link Google Maps" value={gmapLink} onInput={e => setGmapLink(e.currentTarget.value)} required={false} placeholder={'https://'} />

                        <Button>{editBtn}</Button>
                    </form>
                </Popup>
            }
            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <TitleAdmin
                        title="Hapus Acara"
                        right={
                            <Button circle color="muted" accent="secondary" onClick={() => setDeleting(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <form onSubmit={del}>
                        <div>Yakin ingin menghapus acara {schedule.title}? Tindakan ini tidak dapat dipulihkan</div>

                        <Button style={{width: '100%'}} color="red">{delBtn}</Button>
                        <Button style={{width: '100%'}} color="muted" accent="secondary" onClick={() => setDeleting(false)}>batalkan</Button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default Schedule;