import React from 'react';
import styles from "./TextInputField.module.scss";
import { IInput } from 'interfaces/input.interface';

const TextInputField: React.FC<IInput> = ({ label, value, placeholder, editable }) => {
   
    return (
        <div className={styles.container}>
          <div className={styles.label}>{label}</div>
          <input
            className={styles.input}
            placeholder={placeholder}
            value={value}
            disabled={!editable}
          />
        </div>
      );
}


export default TextInputField;
