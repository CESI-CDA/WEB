// Modal.tsx
import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modalcontent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modal}>
                    {children}
                    <button className="btn btn-primary" onClick={onClose}>Fermer</button>
                </div>

            </div>
        </div>,
        document.getElementById('modal-root')!
    );
};

export default Modal;
