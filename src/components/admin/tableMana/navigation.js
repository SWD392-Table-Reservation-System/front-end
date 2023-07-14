import React from 'react';
import styles from './navigation.module.scss';

const Navigation = () => {
 

  return (
    <div className={styles.verticalNavigation}>
      <div className={styles.logo}>
        <img src="swd-transformed_notext.png" alt="Logo" />
      </div>
      <div className={styles.navigationButtons}>
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
      </div>
    </div>
  );
};

export default Navigation;
