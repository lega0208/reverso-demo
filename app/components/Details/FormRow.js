import React, { memo } from 'react';
import { Col, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';

function FormRow({
  propName,
  labelText,
  colSize = 3,
  labelSize = 2,
  children = null,
  noRow,
  value,
  readOnly = false,
  onChange,
}) {
  return (
    <FormGroup row={!noRow}>
      {!labelText ? null : (
        <Label for={propName} xs={labelSize}>
          {labelText}
        </Label>
      )}
      {!children ? (
        <Col xs={colSize}>
          <input
            className="form-control"
            name={propName}
            id={propName}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
          />
        </Col>
      ) : (
        children
      )}
    </FormGroup>
  );
}

FormRow.propTypes = {
  propName: PropTypes.string,
  labelText: PropTypes.string,
  colSize: PropTypes.number,
  labelSize: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  noRow: PropTypes.bool,
  value: PropTypes.any,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

export default memo(FormRow);
