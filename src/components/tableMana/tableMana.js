import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './tableMana.module.scss';
import { Button } from 'primereact/button';
import Navigation from '../tableMana/navigation';
import axios from 'axios';


const apiUrl = process.env.REACT_APP_API_URL;

const TableMana = () => {
  const [tableData, setTableData] = useState([{ code: 'Table 01', status: 0 }]);

  const getTables = () => {
    const bearerToken = localStorage.getItem('token');
    axios
      .get(`${apiUrl}/api/Tables`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.success) {
          console.log(res.data.data);
          setTableData(res.data.data)
        } else {
          let err = new Error(res.data.errorMessage)
          console.log(err);
          throw err;
        }

      }).catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getTables();

    // setTableData([
    //   { code: 'Table 01', status: 0 },
    //   { code: 'Table 02', status: 1 },
    //   { code: 'Table 03', status: 2 },
    //   { code: 'Table 04', status: 0 },
    //   { code: 'Table 05', status: 0 },
    //   { code: 'Table 06', status: 0 },
    //   { code: 'Table 07', status: 0 },
    //   { code: 'Table 08', status: 0 },
    //   { code: 'Table 09', status: 0 },
    //   { code: 'Table 10', status: 0 },
    //   { code: 'Table 11', status: 0 },
    //   { code: 'Table 12', status: 0 },
    //   { code: 'Table 13', status: 0 },
    //   { code: 'Table 14', status: 0 },
    //   { code: 'Table 15', status: 0 },
    //   { code: 'Table 16', status: 0 },
    //   { code: 'Table 17', status: 0 },
    //   { code: 'Table 18', status: 0 },
    //   { code: 'Table 19', status: 0 },
    //   { code: 'Table 20', status: 0 },
    //   { code: 'Table 21', status: 0 },
    //   { code: 'Table 22', status: 0 },
    //   { code: 'Table 23', status: 0 },
    //   { code: 'Table 24', status: 0 },
    //   { code: 'Table 25', status: 0 },
    //   { code: 'Table 26', status: 0 },
    //   { code: 'Table 27', status: 0 },
    //   { code: 'Table 28', status: 0 },
    //   { code: 'Table 29', status: 0 },
    //   { code: 'Table 30', status: 0 }
    // ]);
  }, [])



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
      const entry = tableData[index % tableData.length];
      const { code, status } = entry;
      row.push(
        <td key={index}>
          <Button
            label={code}
            onClick={() => handleClick(code)}
            style={{ backgroundColor: [status === 1 ? '#FFF500' : (status === 2 ? '#48EF45' : '#CD672E')], color: 'black' }}
          />
        </td>
      );
    }
    table.push(<tr key={i}>{row}</tr>);
  }

  return (
    <div className={styles.TableMana}>
      <Navigation />
      <div className={styles.displayTables}>
        <h1>Table Management</h1>
        <table>
          <tbody>{table}</tbody>
        </table>
      </div>
    </div>
  );
};

TableMana.propTypes = {};

TableMana.defaultProps = {};

export default TableMana;
