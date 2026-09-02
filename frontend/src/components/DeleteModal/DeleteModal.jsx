import styles from "./DeleteModal.module.css";

export default function DeleteModal({ isOpen, chatName, onConfirm, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <h4>Delete Chat?</h4>
        <p>Are you sure you want to delete <strong>{chatName}</strong>? This action cannot be undone.</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.deleteBtn} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}