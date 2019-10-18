import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import TableRow from './TableRow';

function DataTable({ modelsData, setSelection, openDetails, selection }) {
  return (
    <Table
      striped
      bordered
      hover
      size="sm"
      className="align-middle"
      id="data-table"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th className="text-center">Language</th>
          <th>URL</th>
          <th className="text-center">Active</th>
        </tr>
      </thead>
      <tbody>
        {modelsData.map(modelData => (
          <TableRow
            rowData={modelData}
            key={modelData.url}
            onClick={setSelection}
            onDoubleClick={openDetails}
            selected={selection === modelData.id}
          />
        ))}
      </tbody>
    </Table>
  );
}

DataTable.propTypes = {
  modelsData: PropTypes.array,
  setSelection: PropTypes.func,
  openDetails: PropTypes.func,
  selection: PropTypes.number,
};

DataTable.defaultProps = {
  modelsData: [],
};

export default memo(DataTable);
