import React from "react";
import styles from "./styles/TitleAdmin.module.css";

const TitleAdmin = ({title = '', description = '', right = null, left = null, style}) => {
    return (
        <div className="inline" style={{marginBottom: 40,...style}}>
            {
                left !== null &&
                <>{left}</>
            }
            <div className={styles.Left}>
                <div className={styles.Title}>{title}</div>
                {
                    description !== '' &&
                    <div className={styles.Description}>{description}</div>
                }
            </div>
            {
                right !== null &&
                <>{right}</>
            }
        </div>
    )
}

export default TitleAdmin;