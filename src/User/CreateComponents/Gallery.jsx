import React, { useEffect } from "react";
import styles from "../styles/Create.module.css";
import InputFile from "../../components/InputFile";

const Gallery = ({typing, fields, ableToNext, setAbleToNext}) => {
    useEffect(() => {
        if (fields.galleries[0] !== null) {
            setAbleToNext(true)
        }
    }, [fields]);

    return (
        <div className={styles.Container}>
            <div className={styles.Content}>
                <div className={styles.Title}>Galeri Foto</div>
                <div className={styles.Description}>
                    Upload koleksi foto pasangan
                </div>

                <div className={styles.GalleryContainer}>
                    {
                        fields.galleries.map((gall, g) => (
                            <InputFile key={g} size="120px" label="Pilih Foto" labelStyle={{fontSize: 12}} onChange={(input, e) => {
                                let galls = [...fields.galleries];
                                galls[g] = input.files[0];
                                galls.push(null);
                                typing({
                                    galleries: galls
                                })
                            }} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Gallery;