import React from 'react';
import PropTypes from 'prop-types';
import styles from './tableMana.scss';
import withAuth from '../login/loginAuthenHOC';

const TableMana = () => (
  <div className={styles.TableMana}>
    TableMana Component
  </div>
);

TableMana.propTypes = {};

TableMana.defaultProps = {};

export default withAuth(TableMana);
