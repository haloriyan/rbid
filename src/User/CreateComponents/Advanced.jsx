import React, { useEffect } from "react";
import styles from "../styles/Create.module.css";
import Toggler from "../../components/Toggler";
import Input from "../../components/Input";
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";
import moment from "moment";

const inputStyles = Input({exportStyles: true});
const InputContainer = ({children}) => {
    return (
        <div className={inputStyles.styles.Wrapper}>
            <div className={inputStyles.styles.Area}>
                {children}
            </div>
            {inputStyles.bottomLine}
        </div>
    )
}

const Advanced = ({fields, typing, ableToNext, setAbleToNext}) => {
    useEffect(() => {
        if (fields.title !== "") {
            setAbleToNext(true);
        }
    }, [fields])
    return (
        <div className={styles.Container}>
            <div className={styles.Content}>
                <div className={styles.Title}>Lanjutan</div>
                <div className={styles.Description}>
                    Pengaturan lebih lanjut
                </div>

                <div style={{height: 40}}></div>

                <div className={styles.LabelTitle}>Judul Undangan</div>
                <div className={styles.LabelDescription}>
                    Saran: Undangan Pernikahan {fields.groom_name} & {fields.bride_name}
                </div>
                <input type="text" className="input" value={fields.title} onInput={e => typing({
                    title: e.currentTarget.value,
                })} />

                <div style={{height: 20}}></div>

                <div className={styles.LabelTitle}>Tanggal Pernikahan</div>
                <div className={styles.LabelDescription}>
                    Kapan pernikahan ini akan diadakan?
                </div>

                <InputContainer>
                    <Flatpickr
                        style={{height: 40}}
                        value={fields.date}
                        options={{
                            enableTime: true,
                            dateFormat: 'Y-m-d',
                        }}
                        onChange={([date]) => {
                            let dt = moment(date);
                            typing({
                                date: dt.format('Y-MM-DD')
                            })
                        }}
                    />
                </InputContainer>

                <div style={{height: 20}}></div>

                <div className={styles.LabelTitle}>Zona Waktu</div>
                <div className={styles.LabelDescription}>
                    Pilih di zona waktu mana acara akan diselenggarakan
                </div>

                <Toggler
                    options={[
                        {label: "WIB (GMT +7)", value: "Asia/Jakarta"},
                        {label: "WITA (GMT +8)", value: "Asia/Makassar"},
                        {label: "WIT (GMT +8)", value: "Asia/Jayapura"},
                    ]}
                    value={fields.timezone}
                    onClick={newValue => {
                        typing({
                            timezone: newValue
                        })
                    }}
                />
            </div>
        </div>
    )
}

export default Advanced