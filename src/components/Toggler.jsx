import React from "react";
import styles from "./styles/Toggler.module.css";

const optionsTemp = [{
    label: "Option A",
    value: "option_a"
}];

const Toggler = ({options = optionsTemp, value, setValue = null, onClick = null}) => {
    return (
        <div className={styles.Area}>
            {
                options.map((opt, o) => (
                    <div key={o} className={`${styles.Item} ${value === opt.value ? styles.Active : null}`} onClick={() => {
                        if (onClick !== null) {
                            onClick(opt.value);
                        }
                        if (setValue !== null) {
                            setValue(opt.value);
                        }
                    }}>
                        {opt.label}
                    </div>
                ))
            }
        </div>
    )
}

export default Toggler;