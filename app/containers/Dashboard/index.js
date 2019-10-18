/*
 * Dashboard
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import DataTable from 'components/Dashboard/DataTable';
import { getData, setSelection } from './actions';
import { openDetails } from '../Details/actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import Wrapper from './Wrapper';
import Details from '../Details';

const key = 'dashboard';

export default function HomePage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();
  const dispatchOpenDetails = () => dispatch(openDetails());
  const dispatchSetSelection = selectionId =>
    dispatch(setSelection(selectionId));

  const [isLoading, modelsData, dataError, selectionId] = useSelector(
    ({ dashboard: { loading, data, error, selection } }) => [
      loading,
      data,
      error,
      selection,
    ],
  );

  useEffect(() => {
    if (!modelsData.length && !isLoading && !dataError) {
      dispatch(getData());
    }
  });

  return (
    <Wrapper>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
      <Button color="primary" className="my-1" onClick={dispatchOpenDetails}>
        View/Edit details
      </Button>
      <DataTable
        modelsData={modelsData}
        openDetails={dispatchOpenDetails}
        setSelection={dispatchSetSelection}
        selection={selectionId}
      />
      <Details />
    </Wrapper>
  );
}
