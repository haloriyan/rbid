import React, { useEffect, useState } from "react";
import styles from "./styles/Header.module.css";
import { BiCheck, BiChevronDown, BiCog, BiShare, BiShareAlt, BiX } from "react-icons/bi";
import Button from "../components/Button";
import Substring from "../components/Substring";
import Popup from "../components/Popup";
import TitleAdmin from "./TitleAdmin";
import config from "../config";
import Separator from "../components/Separator";
import { useNavigate } from "react-router-dom";

const Header = ({weddings = [], weddingID = null, page = 'dashboard'}) => {
    const navigate = useNavigate();
    const [isSharing, setSharing] = useState(false);
    const [isSelecting, setSelecting] = useState(false);
    const [theWedding, setTheWedding] = useState(null);

    useEffect(() => {
        if (theWedding === null) {
            weddings.map(wedd => {
                if (parseInt(wedd.id) === parseInt(weddingID)) {
                    setTheWedding(wedd);
                }
            })
        }
    }, [theWedding]);

    const copyLink = () => {
        const link = `${config.appDomain}/${theWedding?.slug}`;
        navigator.clipboard.writeText(link);
    }

    return (
        <>
            <div className={styles.Header}>
                <div className={styles.Title}>Rabee.ID</div>
                {
                    weddings.length > 0 &&
                    <div className={styles.Selector} onClick={() => setSelecting(true)}>
                        {
                            window.screen.width > 480 ?
                            <div>{theWedding?.title}</div>
                            :
                            <div>{Substring(theWedding?.title, 20)}</div>
                        }
                        <BiChevronDown />
                    </div>
                }
                <div className={styles.Grow}></div>
                {
                    weddingID !== null &&
                    <>
                        {
                            window.screen.width > 480 ?
                            <>
                                <Button height={40} style={{borderRadius: 6}} onClick={() => window.open(`${config.appDomain}/${theWedding?.slug}`)} accent="secondary">
                                    Lihat
                                </Button>
                                <Button height={40} style={{borderRadius: 6}} onClick={() => setSharing(true)}>
                                    Bagikan
                                </Button>
                            </>
                            :
                            <Button height={40} circle color="grey" onClick={() => setSharing(true)}>
                                <BiShareAlt />
                            </Button>
                        }
                        <Button height={40} circle color="grey" onClick={() => navigate(`/panel/${weddingID}/settings`)}>
                            <BiCog size={20} />
                        </Button>
                    </>
                }
            </div>

            {
                isSharing &&
                <Popup onDismiss={() => setSharing(false)}>
                    <TitleAdmin
                        title="Bagikan Undangan"
                        right={
                            <Button circle color="muted" accent="secondary" onClick={() => setSharing(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <div className={styles.LinkArea}>
                        <div className={styles.LinkText}>{config.appDomain}/{theWedding?.slug}</div>
                        <Button height={36} onClick={copyLink}>Salin</Button>
                    </div>

                    <Separator color="#ffffff" />

                    <div style={{fontSize: 12,color: '#666'}}>Untuk opsi lebih spesifik lihat bagian Tamu Undangan</div>
                </Popup>
            }
            {
                isSelecting &&
                <Popup onDismiss={() => setSelecting(false)}>
                    <TitleAdmin
                        title="Undangan Saya"
                        right={
                            <Button circle color="muted" accent="secondary" onClick={() => setSelecting(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <div className={styles.WeddingArea}>
                        {
                            weddings.map((wedd, w) => (
                                <div key={w} className={styles.WeddingItem}>
                                    <div className={styles.Grow}>{wedd.title}</div>
                                    {
                                        parseInt(wedd.id) === parseInt(weddingID) ?
                                            <BiCheck />
                                        :
                                            <Button height={32} accent="secondary" onClick={() => {
                                                window.location.href = `/panel/${wedd.id}/${page}`;
                                            }}>Pilih</Button>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </Popup>
            }
        </>
    )
}

export default Header;