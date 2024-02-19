import React, { useState } from "react";
import styles from "./styles/LeftMenu.module.css";
import { BiAlarmExclamation, BiBed, BiCategory, BiChevronLeft, BiCog, BiComment, BiEdit, BiGroup, BiHistory, BiHome, BiImages, BiInfoCircle, BiListCheck, BiMap, BiMobile, BiSolidCoupon, BiTag, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";

const LeftMenu = ({active, weddingID}) => {
    const [mobileShowMenu, setMobileShowMenu] = useState(false);
    const [isPublic, setPublic] = useState(false);

    if (window.screen.width > 480) {
        return (
            <div className={styles.Menu}>
    
                <div className={styles.MenuArea}>
                    <Link to={`/panel/${weddingID}/dashboard`} className={`${styles.MenuItem} ${active === 'dashboard' ? styles.MenuActive : ''}`}>
                        <BiHome />
                        <div className={styles.MenuText}>Dashboard</div>
                    </Link>
                    {/* <div style={{color: '#999',fontSize: 14,fontWeight: 600,margin: '20px 0px 10px 0px'}}>
                        Data
                    </div> */}
                    <div style={{color: '#999',fontSize: 14,fontWeight: 600,margin: '20px 0px 10px 0px'}}></div>
                    <Link to={`/panel/${weddingID}/basic`} className={`${styles.MenuItem} ${active === 'basic' ? styles.MenuActive : ''}`}>
                        <BiInfoCircle />
                        <div className={styles.MenuText}>Info Dasar</div>
                    </Link>
                    <Link to={`/panel/${weddingID}/schedule`} className={`${styles.MenuItem} ${active === 'schedule' ? styles.MenuActive : ''}`}>
                        <BiHistory />
                        <div className={styles.MenuText}>Jadwal</div>
                    </Link>
                    <Link to={`/panel/${weddingID}/guest`} className={`${styles.MenuItem} ${active === 'guest' ? styles.MenuActive : ''}`}>
                        <BiGroup />
                        <div className={styles.MenuText}>Daftar Tamu</div>
                    </Link>
                    <Link to={`/panel/${weddingID}/gallery`} className={`${styles.MenuItem} ${active === 'gallery' ? styles.MenuActive : ''}`}>
                        <BiImages />
                        <div className={styles.MenuText}>Galeri</div>
                    </Link>

                    <div style={{color: '#999',fontSize: 14,fontWeight: 600,margin: '20px 0px 10px 0px'}}></div>
                    <Link to={`/panel/${weddingID}/settings`} className={`${styles.MenuItem} ${active === 'settings' ? styles.MenuActive : ''}`}>
                        <BiCog />
                        <div className={styles.MenuText}>Pengaturan</div>
                    </Link>

                    <div style={{color: '#999',fontSize: 14,fontWeight: 600,margin: '20px 0px 10px 0px'}}>
                        Report
                    </div>
                    <Link to={`/panel/${weddingID}/greetings`} className={`${styles.MenuItem} ${active === 'greetings' ? styles.MenuActive : ''}`}>
                        <BiComment />
                        <div className={styles.MenuText}>Ucapan</div>
                    </Link>

                </div>
            </div>
        )
    }
}

export default LeftMenu;