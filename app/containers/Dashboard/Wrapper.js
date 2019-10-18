import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

export default function Wrapper({ children }) {
  return (
    <Container fluid className="mt-4 mb-5">
      <Row>
        <Col />
        <Col xs={12} lg={11} xl={10}>
          {children}
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

Wrapper.propTypes = {
  children: PropTypes.array.isRequired,
};
