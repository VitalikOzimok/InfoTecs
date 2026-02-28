import styles from "./Table.module.css";
import { Mars, Venus } from "lucide-react";

export default function Card({
  firstName,
  lastName,
  maidenName,
  age,
  gender,
  phone,
  email,
  city,
  country,
  onClick,
}) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cell}>{firstName}</div>
      <div className={styles.cell}>{lastName}</div>
      <div className={styles.cell}>{maidenName ? maidenName : "-"}</div>
      <div className={styles.cell}>{age}</div>
      <div className={styles.cell}>
        {gender === "male" ? (
          <Mars className={styles.men} />
        ) : (
          <Venus className={styles.women} />
        )}
      </div>
      <div className={styles.cell}>{phone}</div>
      <div className={styles.cell}>{email}</div>
      <div className={styles.cell}>{city}</div>
      <div className={styles.cell}>{country}</div>
    </div>
  );
}
