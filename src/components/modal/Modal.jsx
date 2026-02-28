import { X, User } from "lucide-react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

export function Modal({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <X className={styles.closeButton} onClick={onClose} />
        <div className={styles.avatarPlaceholder}>
          <User size={40} />
        </div>
        <h2 className={styles.title}>
          {user.firstName} {user.lastName} {user.maidenName}
        </h2>
        <div className={styles.content}>
          <p>
            <strong>Возраст:</strong> {user.age}
          </p>
          <p>
            <strong>Пол:</strong>{" "}
            {user.gender === "male" ? "Мужской" : "Женский"}
          </p>
          <p>
            <strong>Телефон:</strong> {user.phone}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Город:</strong> {user.address.city}
          </p>
          <p>
            <strong>Страна:</strong> {user.address.country}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
