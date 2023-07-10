import React from 'react';
import PropTypes from 'prop-types';
import styles from './tableMana.scss';
import { Button } from 'primereact/button';

const TableMana = () => {
  const data = [
    { label: 'Table 1', color: '#CD672E' },
    { label: 'Table 2', color: '#FFF500' },
    { label: 'Table 3', color: '#48EF45' },
    { label: 'Table 4', color: '#CD672E' },
    { label: 'Table 5', color: '#CD672E' },
    { label: 'Table 6', color: '#CD672E' },
    { label: 'Table 7', color: '#CD672E' },
    { label: 'Table 8', color: '#CD672E' },
    { label: 'Table 9', color: '#CD672E' },
    { label: 'Table 10', color: '#CD672E' },
    { label: 'Table 11', color: '#CD672E' },
    { label: 'Table 12', color: '#CD672E' },
    { label: 'Table 13', color: '#CD672E' },
    { label: 'Table 14', color: '#CD672E' },
    { label: 'Table 15', color: '#CD672E' },
    { label: 'Table 16', color: '#CD672E' },
    { label: 'Table 17', color: '#CD672E' },
    { label: 'Table 18', color: '#CD672E' },
    { label: 'Table 19', color: '#CD672E' },
    { label: 'Table 20', color: '#CD672E' },
    { label: 'Table 21', color: '#CD672E' },
    { label: 'Table 22', color: '#CD672E' },
    { label: 'Table 23', color: '#CD672E' },
    { label: 'Table 24', color: '#CD672E' },
    { label: 'Table 25', color: '#CD672E' },
    { label: 'Table 26', color: '#CD672E' },
    { label: 'Table 27', color: '#CD672E' },
    { label: 'Table 28', color: '#CD672E' },
    { label: 'Table 29', color: '#CD672E' },
    { label: 'Table 30', color: '#CD672E' }
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
