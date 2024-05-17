import React from 'react';
import styles from "./StatCard.module.scss";
import { IStatCard } from 'interfaces/stat-card.interface';

const StatCard: React.FC<IStatCard> = ({ number, icon }) => {
    return (
      <div className={styles.statsCard}>
        <div className={styles.number}>{number}</div>
        {icon && <i className={`${icon} ${styles.icon}`} style={{ fontSize: "2x" }}></i>}
      </div>
    );
  };

export default StatCard;
