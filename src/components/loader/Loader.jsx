import styles from "./Loader.module.css";
export function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <span className={styles.loaderText}>Загрузка</span>
      <div className={styles.loader} />
    </div>
  );
}
