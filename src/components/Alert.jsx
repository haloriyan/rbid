import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/Alert.module.css";

const Alert = ({message, setMessage, duration = 3000, status = 200, style}) => {
    useEffect(() => {
        if (message !== null && duration > 0) {
            let to = setTimeout(() => {
                setMessage(null);
            }, duration);

            return () => clearInterval(to);
        }
    }, [message, duration]);

    if (message !== null) {
        return (
            <div className={`${styles.Area} ${styles[`Color_${status.toString()[0]}`]}`} style={style}>
                {message}
            </div>
        )
    }
}

export default Alert;