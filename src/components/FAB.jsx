import { BiPlus } from "react-icons/bi";
import styles from "./styles/FAB.module.css";
import config from "../config";

const FAB = ({icon = <BiPlus />, size = 50, onClick}) => {
    return (
        <div className={styles.FAB} style={{
            height: size,
            backgroundColor: config.primaryColor
        }} onClick={onClick}>
            {icon}
        </div>
    )
}

export default FAB;