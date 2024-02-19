import React, { useState } from "react";
import styles from "./styles/CreateNavigator.module.css";
import Button from "../components/Button";

const Navigator = ({step = 0, onBack, onNext, ableToNext = true}) => {
    const stepsCounter = [1,1,1];
    
    return (
        <div className={styles.Container}>
            <div className="inline" style={{gap: 5}}>
                {
                    stepsCounter.map((count, c) => (
                        <div key={c} className={`${styles.Step} ${step >= c ? styles.Active : null}`}></div>
                    ))
                }
            </div>
            <div className={`inline ${styles.Content}`}>
                {
                    step > 0 &&
                    <div className={styles.Back} onClick={onBack}>Kembali</div>
                }
                <div className={styles.Center}></div>
                <Button style={{
                    opacity: ableToNext ? 1 : 0.3,
                    cursor: ableToNext ? 'pointer' : 'not-allowed'
                }} onClick={() => {
                    if (ableToNext) {
                        onNext();
                    }
                }}>
                    {
                        step === stepsCounter.length - 1 ? 'Submit' : 'Berikutnya'
                    }
                </Button>
            </div>
        </div>
    )
}

export default Navigator;