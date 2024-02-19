import React from "react";
import styles from "./styles/OnBoarding.module.css";
import Illustration from "../images/OnBoarding.svg";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.Content}>
            <div className={styles.Left}>
                <div className={styles.Title}>Buat Undangan Pertamamu</div>
                <div className={styles.Description}>
                    Langkah awal memulai kehidupan bahagiamu dimulai dari sini
                </div>
                <div className="inline">
                    <Button onClick={() => navigate('/create')}>
                        Buat Undangan
                    </Button>
                </div>
            </div>
            <img src={Illustration} alt="Ilustrasi" className={styles.Image} />
        </div>
    )
}

export default OnBoarding