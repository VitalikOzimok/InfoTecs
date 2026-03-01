import { useState } from "react";
import { HeadersItems } from "../../constants/headersItems";
import styles from "./Table.module.css";
import { sortOptions } from "../../constants/headersItems";

export function Headers({ onSort }) {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleOptionClick = (option, item) => {
    onSort(item.field, option.value);
    setOpenMenuIndex(null);
  };

  return (
    <div className={styles.headers}>
      {HeadersItems.map((item, index) => (
        <div className={styles.headerItemContainer} key={index}>
          <div className={styles.headerItem}>
            {item.sort ? (
              <div
                className={styles.menuButton}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu(index);
                }}
              >
                <span>{item.label}</span>
                <span className={styles.icon}> ▾</span>
              </div>
            ) : (
              <>
                <span>{item.label}</span>
                <span className={styles.iconWhite}> ▾</span>
              </>
            )}
          </div>

          {openMenuIndex === index && (
            <div className={styles.dropdownMenu}>
              {sortOptions.map((option, idx) => (
                <button
                  key={idx}
                  className={styles.dropdownItem}
                  onClick={() => handleOptionClick(option, item)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
