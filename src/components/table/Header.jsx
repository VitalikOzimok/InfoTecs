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
    let key = "";
    let order = "";

    if (item.sort) {
      key = item.field;
      order = option.value;
    }

    onSort(key, order);
    setOpenMenuIndex(null);
  };

  return (
    <div className={styles.headers}>
      {HeadersItems.map((item, index) => (
        <div className={styles.headerItemContainer} key={index}>
          <div className={styles.headerItem}>
            {item.sort ? (
              <span
                className={styles.menuButton}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu(index);
                }}
              >
                {item.label}⋮
              </span>
            ) : (
              <span>{item.label}</span>
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
