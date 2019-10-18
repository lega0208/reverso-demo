/**
 *
 * Details
 *
 */

import React, { memo } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDetails from './selectors';
import reducer from './reducer';
import { closeDetails } from './actions';
import saga from './saga';
import DetailsForm from './DetailsForm';

const stateSelector = createStructuredSelector({
  details: makeSelectDetails(),
});

function Details() {
  useInjectReducer({ key: 'details', reducer });
  useInjectSaga({ key: 'details', saga });

  const { details } = useSelector(stateSelector);
  const { isOpen, data } = details;

  const dispatch = useDispatch();
  const toggle = save => dispatch(closeDetails(save));

  return (
    <Modal
      id="details-modal"
      isOpen={isOpen}
      toggle={toggle}
      size="lg"
      backdrop={false}
    >
      <ModalHeader toggle={toggle}>View/Edit details</ModalHeader>
      <ModalBody>
        <DetailsForm data={data} />
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => toggle(true)}>
          Save
        </Button>{' '}
        <Button color="danger" onClick={() => toggle()}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default memo(Details);
