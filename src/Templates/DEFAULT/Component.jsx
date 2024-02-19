import moment from "moment";
import Separator from "../../components/Separator";
import styles from "./Style.module.css";
import config from "../../config";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { BiCheck, BiChevronLeft, BiChevronRight, BiX } from "react-icons/bi";
import Popup from "../../components/Popup";
import TitleAdmin from "../../Partials/TitleAdmin";
import axios from "axios";
import Input from "../../components/Input";
import InArray from "../../components/InArray";

const Default = ({wedding, guest}) => {
    const [index, setIndex] = useState(0);
    const [undex, setUndex] = useState(0);
    const [reserveButton, setReserveButton] = useState('Konfirmasi Kehadiran');
    
    const [isGreeting, setGreeting] = useState(false);
    const [isReserving, setReserving] = useState(false);

    const [name, setName] = useState('');
    const [body, setBody] = useState('');
    const [greetingResponse, setGreetingResponse] = useState(null);
    const [greetingButton, setGreetingButton] = useState('Kirimkan');
    const [selectedSchedules, setSelectedSchedules] = useState([]);

    useEffect(() => {
        if (name === '' && guest !== null) {
            setName(guest.name);
        }
    }, [name, guest]);

    const greet = e => {
        setGreetingButton('Mengirim');
        axios.post(`${config.baseUrl}/api/wedding/${wedding.slug}/greeting`, {
            name, body
        })
        .then(response => {
            setName('');
            setBody('');
            setGreeting(false);
            setGreetingResponse(response.data.message);
            setGreetingButton('Kirimkan');
        })
        .catch(e => setGreetingButton('Kirimkan'));
        e.preventDefault();
    }

    useEffect(() => {
        if (greetingResponse !== null) {
            let to = setTimeout(() => setGreetingResponse(null), 4000);
            return () => clearTimeout(to);
        }
    }, [greetingResponse])

    const reserve = (e) => {
        setReserveButton('Menyimpan...');
        axios.post(`${config.baseUrl}/api/wedding/${wedding.slug}/reservation`, {
            guest_id: guest.id,
            schedules: selectedSchedules
        })
        .then(response => {
            let res = response.data;
            console.log(res);
            if (res.status === 200) {
                // 
            }
            setReserveButton('Konfirmasi Kehadiran');
        })
        .catch(e => setReserveButton('Konfirmasi Kehadiran'));
        e.preventDefault()
    }

    return (
        <>
            <div className={styles.Container}>
                <div className={styles.Content}>
                    <div className={styles.Cover} style={{
                        height: window.innerHeight,
                    }}>
                        <div className={styles.InnerCover}>
                            <img src={require('./decor-2.png')} className={styles.DecorTop} />
                            <div className={styles.CoverTitle}>{wedding.title}</div>
                            <div className={styles.GroomName}>
                                {wedding.groom_name} & {wedding.bride_name}
                            </div>
                            <Separator width="40%" color="#333" height={0.5} margin="20px 0px 5px 0px" />
                            <div className={styles.CoverDate}>
                                {moment(wedding.schedules[0].date).format('DD MMMM Y')}
                            </div>
                            <a href={wedding.schedules[0].gmaps_link} target="_blank" className={styles.CoverAddress}>
                                {wedding.schedules[0].address}
                            </a>

                            {
                                guest !== null &&
                                <div className={styles.CoverGuest}>
                                    <div className={styles.GuestLabel}>Penerima</div>
                                    <div className={styles.GuestName}>{guest.name}</div>
                                </div>
                            }
                        </div>

                        <div className={styles.CoverBorder}></div>
                        
                        <img src={require('./flowers-top-right.png')} className={styles.TopRight} />
                        <img src={require('./flowers-bottom.png')} className={styles.BottomLeft} />
                        <img src={require('./flowers-bottom.png')} className={styles.BottomRight} />
                    </div>

                    <div className={styles.Intro}>
                        <Separator width="55%" color="#333" margin="20px 0px 40px 0px" />
                        <pre>{wedding.intro}</pre>
                        <Separator width="25%" color="#333" margin="40px 0px 0px 0px" />
                    </div>

                    <div className={styles.Mempelai}>
                        <div className={styles.Title}>Mempelai</div>
                        <div className={styles.MempelaiContainer}>
                            <div className={styles.MempelaiItem}>
                                <img src={`${config.baseUrl}/storage/groom_photos/${wedding.groom_photo}`} alt={wedding.groom_name} className={styles.MempelaiPhoto} />
                                <div className={styles.MempelaiName}>{wedding.groom_name}</div>
                                <div className={styles.MempelaiLabel}>
                                    Putra<br />Bapak {wedding.groom_father} dan Ibu {wedding.groom_mother}
                                </div>
                            </div>
                            <div className={styles.MempelaiItem}>
                                <img src={`${config.baseUrl}/storage/bride_photos/${wedding.bride_photo}`} alt={wedding.groom_name} className={styles.MempelaiPhoto} />
                                <div className={styles.MempelaiName}>{wedding.bride_name}</div>
                                <div className={styles.MempelaiLabel}>
                                    Putri<br />Bapak {wedding.bride_father} dan Ibu {wedding.bride_mother}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.Mempelai}>
                        <div className={styles.Title}>Save the Dates!</div>
                        <div className={styles.CountdownContainer}>
                            <div className={styles.CountdownBox}>
                                <div className={styles.CountdownInner}>
                                    <div className={styles.CountdownNumber}>23</div>
                                    <div className={styles.CountdownLabel}>Hari</div>
                                </div>
                            </div>
                            <div className={styles.CountdownBox}>
                                <div className={styles.CountdownInner}>
                                    <div className={styles.CountdownNumber}>23</div>
                                    <div className={styles.CountdownLabel}>Jam</div>
                                </div>
                            </div>
                            <div className={styles.CountdownBox}>
                                <div className={styles.CountdownInner}>
                                    <div className={styles.CountdownNumber}>23</div>
                                    <div className={styles.CountdownLabel}>Menit</div>
                                </div>
                            </div>
                            <div className={styles.CountdownBox}>
                                <div className={styles.CountdownInner}>
                                    <div className={styles.CountdownNumber}>23</div>
                                    <div className={styles.CountdownLabel}>Menit</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.ScheduleContainer}>
                            {
                                wedding.schedules.map((sched, s) => (
                                    <div key={s} className={styles.ScheduleItem}>
                                        <div className="inline">
                                            <div className={styles.ScheduleTitle}>{sched.title}</div>
                                            <div className={styles.ScheduleTime}>{moment(sched.date).format('HH:mm')} {config.timezones[wedding.timezone]}</div>
                                        </div>
                                        <div className={styles.ScheduleAddress}>{sched.address}</div>
                                        {
                                            sched.gmaps_link !== null &&
                                            <div className="inline">
                                                <Button height={32} onClick={() => setReserving(true)}><BiCheck /> Akan Hadir</Button>
                                                <Button accent="secondary" height={32} onClick={() => window.open(sched.gmaps_link, '_blank')}>Google Maps</Button>
                                            </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className={styles.Mempelai}>
                        <div className={styles.Title}>Kisah Kami</div>
                        <div className={styles.GalleryItem}>
                            <img src={`${config.baseUrl}/storage/gallery_images/${wedding.galleries[index].filename}`} className={styles.GalleryImage} alt={wedding.galleries[index].caption} />
                            {
                                wedding.galleries[index].caption !== null &&
                                <div className={styles.GalleryCaption}>{wedding.galleries[index].caption}</div>
                            }

                            <div className={styles.GalleryControl}>
                                {
                                    index > 0 &&
                                    <Button circle height={32} onClick={() => setIndex(index - 1)}>
                                        <BiChevronLeft />
                                    </Button>
                                }
                                <div style={{display: 'flex',flexGrow: 1}}></div>
                                {
                                    (index !== wedding.galleries.length - 1) &&
                                    <Button circle height={32} onClick={() => setIndex(index + 1)}>
                                        <BiChevronRight />
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>

                    <div className={styles.Mempelai}>
                        <div className={styles.Title}>Ucapan & Doa</div>
                        <div className={styles.GreetingBox}>
                            <div className={styles.GreetingName}>{wedding.greetings[undex].name}</div>
                            <div className={styles.GreetingBody}>{wedding.greetings[undex].body}</div>
                            <div className={styles.GalleryControl}>
                                {
                                    undex > 0 &&
                                    <Button circle height={32} onClick={() => setUndex(undex - 1)}>
                                        <BiChevronLeft />
                                    </Button>
                                }
                                <div style={{display: 'flex',flexGrow: 1}}></div>
                                {
                                    (undex !== wedding.greetings.length - 1) &&
                                    <Button circle height={32} onClick={() => setUndex(undex + 1)}>
                                        <BiChevronRight />
                                    </Button>
                                }
                            </div>
                        </div>

                        <Button height={42} onClick={() => setGreeting(true)} color="cok" accent="tertiary" style={{backgroundColor: '#333',color: '#fff'}}>Kirim Ucapan</Button>
                    </div>
                </div>
            </div>

            {
                isGreeting &&
                <Popup onDismiss={() => setGreeting(false)}>
                    <TitleAdmin
                        title="Kirim Ucapan"
                        right={
                            <Button circle color="muted" accent="secondary" onClick={() => setGreeting(false)}>
                                <BiX />
                            </Button>
                        }
                    />
                    <form onSubmit={greet}>
                        <Input label="Nama Anda" value={name} onInput={e => setName(e.currentTarget.value)} readonly={guest !== null ? true : false} />
                        <Input label="Isi ucapan" value={body} onInput={e => setBody(e.currentTarget.value)} multiline />

                        <Button>{greetingButton}</Button>
                    </form>
                </Popup>
            }
            {
                (greetingResponse !== null) &&
                <Popup onDismiss={() => setGreetingResponse(null)}>
                    <TitleAdmin
                        title={greetingResponse}
                        right={
                            <Button circle color="muted" accent="secondary" onClick={() => setGreetingResponse(null)}>
                                <BiX />
                            </Button>
                        }
                    />
                </Popup>
            }

            {
                isReserving &&
                <Popup onDismiss={() => setReserving(false)}>
                    <TitleAdmin 
                        title="Hadir ke Acara"
                        right={
                            <Button circle color="muted" accent="secondary" onClick={() => setReserving(null)}>
                                <BiX />
                            </Button>
                        }
                    />
                    <form onSubmit={reserve}>
                        {
                            wedding.schedules.map((sched, s) => (
                                <div className={`${styles.ScheduleOption} ${InArray(sched.id, selectedSchedules) ? styles.Active : null}`} key={s} onClick={() => {
                                    let scheds = [...selectedSchedules];
                                    let i = scheds.indexOf(sched.id);
                                    if (i >= 0) {
                                        scheds.splice(i, 1);
                                    } else {
                                        scheds.push(sched.id);
                                    }
                                    setSelectedSchedules(scheds);
                                }}>
                                    <div className="inline">
                                        <div className={styles.ScheduleOptionTitle}>{sched.title}</div>
                                        <div className={styles.ScheduleOptionTime}>
                                            {moment(sched.time).format('DD MMM - HH:mm')} {config.timezones[wedding.timezone]}
                                        </div>
                                    </div>
                                    <div className={styles.ScheduleOptionAddress}>{sched.address}</div>
                                </div>
                            ))
                        }
                        <Button type={selectedSchedules.length > 0 ? "submit" : "button"}>{reserveButton}</Button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default Default