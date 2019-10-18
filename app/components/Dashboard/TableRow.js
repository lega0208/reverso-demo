import React from 'react';
import PropTypes from 'prop-types';

export default function TableRow({
  rowData: {
    id,
    name = '',
    langTo = 'N/A',
    langFrom = 'N/A',
    url = '',
    enabled = false,
  },
  selected = false,
  onClick = () => null,
  onDoubleClick = () => null,
}) {
  const selectedClass = selected ? 'selected-tr' : '';

  return (
    <tr
      onClick={() => onClick(id)}
      onDoubleClick={onDoubleClick}
      className={selectedClass}
    >
      <td className="align-middle pl-2">{name}</td>
      <td className="text-center align-middle">
        {langFrom}-{langTo}
      </td>
      <td className="small align-middle pl-2">{url}</td>
      <td className="text-center">
        <div className="form-check pl-0">
          <input type="radio" checked={enabled} readOnly />
        </div>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  rowData: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.object,
    ]),
  ),
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
};
