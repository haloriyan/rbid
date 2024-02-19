import styles from "./styles/Loader.module.css";

export default function Loader() {
    return (
        <div className={styles.Container}>
            <div className={styles.Content}>
                <div className={`${styles.Cover} ${styles.pulse}`} style={{
                    height: window.innerHeight - 40,
                    marginTop: 20,
                }}>
                    &nbsp;
                </div>
            </div>
        </div>
    )
}