import styles from "./Filters.module.css";
import { Mars, Venus, X } from "lucide-react";

export function Filters({ onFilterChange, filters }) {
  const { hasMiddleName, gender } = filters;

  const handleHasMiddleNameChange = (e) => {
    onFilterChange({
      ...filters,
      hasMiddleName: e.target.checked,
    });
  };

  const handleGenderChange = (e) => {
    onFilterChange({
      ...filters,
      gender: e.target.value,
    });
  };

  const handleReset = () => {
    onFilterChange({
      hasMiddleName: false,
      gender: "",
    });
  };

  return (
    <div className={styles.checkboxGroup}>
      <div className={styles.checkboxItem}>
        <input
          type="checkbox"
          id="hasMiddleName"
          checked={hasMiddleName}
          onChange={handleHasMiddleNameChange}
        />
        <label htmlFor="hasMiddleName">Есть отчество</label>
      </div>

      <div className={styles.radioGroup}>
        <div className={styles.radioItem}>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={handleGenderChange}
          />
          <Mars className={styles.men} />
        </div>
        <div className={styles.radioItem}>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={handleGenderChange}
          />
          <Venus className={styles.women} />
        </div>
      </div>
      {(hasMiddleName || gender) && (
        <X className={styles.resetButton} onClick={handleReset} />
      )}
    </div>
  );
}
