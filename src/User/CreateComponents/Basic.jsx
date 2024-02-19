import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Create.module.css";
import axios from "axios";
import config from "../../config";
import { useDebouncedCallback } from "use-debounce";
import { FaSpinner } from "react-icons/fa";
import { BiCheck, BiX } from "react-icons/bi";

const Basic = ({typing, fields, setAbleToNext, ableToNext, containerStyles = null, contentStyles = null}) => {
    const [slugValid, setSlugValid] = useState(false);
    const [isChecking, setChecking] = useState(false);
    
    useEffect(() => {
        if (
            fields.groom_name !== "" && 
            fields.groom_photo !== null && 
            fields.groom_father !== "" && 
            fields.groom_mother !== "" && 
            fields.bride_name !== "" && 
            fields.bride_photo !== null && 
            fields.bride_father !== "" && 
            fields.bride_mother !== "" && 
            fields.slug !== "" && slugValid) {
            setAbleToNext(true);
        } else {
            setAbleToNext(false);
        }
    }, [ableToNext, fields, slugValid]);

    const checkSlug = () => {
        axios.get(`${config.baseUrl}/api/wedding/${fields.slug}`)
        .then(response => {
            let res = response.data;
            setChecking(false);
            if (res.wedding === null) {
                setSlugValid(true);
            } else {
                setSlugValid(false);
            }
        })
    }

    const debounce = useDebouncedCallback(checkSlug, 2000);
    
    return (
        <div className={styles.Container} style={containerStyles}>
            <div className={styles.Content} style={contentStyles}>
                <div className={styles.Title}>Data Pengantin</div>
                <div className={styles.Description}>
                    Berikan informasi dasar para mempelai
                </div>

                <div style={{height: 40}}></div>

                <div className={styles.LabelTitle}>Mempelai Pria</div>
                <div className="inline">
                    <div style={{display: 'flex',flexGrow: 1,flexDirection: 'column'}}>
                        <div className={styles.LabelDescription}>Nama Mempelai Pria</div>
                        <input type="text" className="input" value={fields.groom_name} onInput={e => typing({
                            groom_name: e.currentTarget.value,
                        })} />
                    </div>
                    <div style={{display: 'flex',flexGrow: 1,flexDirection: 'column',maxWidth: '40%'}}>
                        <div className={styles.LabelDescription}>Foto Mempelai Pria</div>
                        <input type="file" className="input" onChange={e => {
                            typing({
                                groom_photo: e.currentTarget.files[0]
                            })
                        }} />
                    </div>
                </div>
                <div className="inline">
                    <div style={{display: 'flex',flexGrow: 1,flexDirection: 'column'}}>
                        <div className={styles.LabelDescription}>Nama Ayah Kandung</div>
                        <input type="text" className="input" value={fields.groom_father} onInput={e => typing({
                            groom_father: e.currentTarget.value,
                        })} />
                    </div>
                    <div style={{display: 'flex',flexGrow: 1,flexDirection: 'column'}}>
                        <div className={styles.LabelDescription}>Nama Ibu Kandung</div>
                        <input type="text" className="input" value={fields.groom_mother} onInput={e => typing({
                            groom_mother: e.currentTarget.value,
                        })} />
                    </div>
                </div>

                <div style={{height: 20}}></div>

                <div className={styles.LabelTitle}>Mempelai Wanita</div>
                <div className="inline">
                    <div style={{display: 'flex',flexGrow: 1,flexDirection: 'column'}}>
                        <div className={styles.LabelDescription}>Nama Mempelai Wanita</div>
                        <input type="text" className="input" value={fields.bride_name} onInput={e => typing({
                            bride_name: e.currentTarget.value,
                        })} />
                    </div>
                    <div style={{display: 'flex',flexGrow: 1,flexDirection: 'column',maxWidth: '40%'}}>
                        <div className={styles.LabelDescription}>Foto Mempelai Wanita</div>
                        <input type="file" className="input" onChange={e => {
                            typing({
                                bride_photo: e.currentTarget.files[0]
                            })
                        }} />
                    </div>
                </div>
                <div className="inline">
                    <div style={{display: 'flex',flexGrow: 1,flexDirection: 'column'}}>
                        <div className={styles.LabelDescription}>Nama Ayah Kandung</div>
                        <input type="text" className="input" value={fields.bride_father} onInput={e => typing({
                            bride_father: e.currentTarget.value,
                        })} />
                    </div>
                    <div style={{display: 'flex',flexGrow: 1,flexDirection: 'column'}}>
                        <div className={styles.LabelDescription}>Nama Ibu Kandung</div>
                        <input type="text" className="input" value={fields.bride_mother} onInput={e => typing({
                            bride_mother: e.currentTarget.value,
                        })} />
                    </div>
                </div>

                <div style={{height: 40}}></div>

                <div className={styles.LabelTitle}>Tautan Kustom</div>
                <div className="input">
                    pakkos.com/
                    <input type="text" value={fields.slug} style={{
                        height: 24,
                        border: 'none',
                        outline: 'none',
                        display: 'flex',
                        flexGrow: 1,
                        fontSize: 16
                    }} onInput={e => {
                        setChecking(true);
                        typing({slug: e.currentTarget.value.replace(/ /g, '-')});
                        setSlugValid(false);
                        debounce()
                    }} />
                    {
                        isChecking ?
                        <FaSpinner />
                        :
                        <>
                            {
                                (!slugValid && fields.slug !== "") &&
                                <BiX color={"#e74c3c"} />
                            }
                            {
                                (slugValid && fields.slug !== "") &&
                                <BiCheck color={"#2ecc71"} />
                            }
                        </>
                    }
                </div>
                <div className={styles.LabelDescription}>
                    Tautan yang mudah diingat dan unik akan lebih mudah dicantumkan dan dibagikan lewat kartu nama, situs web, atau media sosial. Misalnya: pakkos.com/kosgubeng. Baca kebijakan tautan kustom Pakkos
                </div>
            </div>
        </div>
    )
}

export default Basic;