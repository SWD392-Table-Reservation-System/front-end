import React from 'react';
import PropTypes from 'prop-types';
import styles from './tableMana.scss';
import { Button } from 'primereact/button';

const TableMana = () => {
  const data = [
    { code: 'Table 1', status: 0 },
    { code: 'Table 2', status: 1 },
    { code: 'Table 3', status: 2 },
    { code: 'Table 4', status: 0 },
    { code: 'Table 5', status: 0 },
    { code: 'Table 6', status: 0 },
    { code: 'Table 7', status: 0 },
    { code: 'Table 8', status: 0 },
    { code: 'Table 9', status: 0 },
    { code: 'Table 10', status: 0 },
    { code: 'Table 11', status: 0 },
    { code: 'Table 12', status: 0 },
    { code: 'Table 13', status: 0 },
    { code: 'Table 14', status: 0 },
    { code: 'Table 15', status: 0 },
    { code: 'Table 16', status: 0 },
    { code: 'Table 17', status: 0 },
    { code: 'Table 18', status: 0 },
    { code: 'Table 19', status: 0 },
    { code: 'Table 20', status: 0 },
    { code: 'Table 21', status: 0 },
    { code: 'Table 22', status: 0 },
    { code: 'Table 23', status: 0 },
    { code: 'Table 24', status: 0 },
    { code: 'Table 25', status: 0 },
    { code: 'Table 26', status: 0 },
    { code: 'Table 27', status: 0 },
    { code: 'Table 28', status: 0 },
    { code: 'Table 29', status: 0 },
    { code: 'Table 30', status: 0 }
  ];

  const handleClick = (label) => {
    console.log(`Button ${label} was clicked.`);
    // You can perform additional actions based on the clicked button label
  };

  const rows = 5;
  const columns = 6;

  const table = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      const index = i * columns + j;
      const entry = data[index % data.length];
      const { label, color } = entry;
      row.push(
        <td key={index}>
          <Button
            label={label}
            onClick={() => handleClick(label)}
            style={{ backgroundColor: [color], color: 'black' }}
          />
        </td>
      );
    }
    table.push(<tr key={i}>{row}</tr>);
  }

  return (
    <div className={styles.TableMana}>
      <h1>TableMana</h1>
      <table>
        <tbody>{table}</tbody>
      </table>
    </div>
  );
};

TableMana.propTypes = {};

TableMana.defaultProps = {};

export default TableMana;
