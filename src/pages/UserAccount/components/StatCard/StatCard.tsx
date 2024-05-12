import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./StatCard.module.scss";
import { IStatCard } from 'interfaces/stat-card.interface';

const StatCard: React.FC<IStatCard> = ({ number, icon }) => {
    return (
      <div className={styles.statsCard}>
        <div className={styles.number}>{number}</div>
        <FontAwesomeIcon icon={icon} className={styles.icon} size="2x" />
      </div>
    );
  };

export default StatCard;
