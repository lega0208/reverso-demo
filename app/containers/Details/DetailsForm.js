import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import FormRow from 'components/Details/FormRow';
import FormSelect from 'components/Details/FormSelect';
import { setData } from './actions';

const makeSetData = dispatch => (propName, valTransform = val => val) => e =>
  dispatch(setData(propName, valTransform(e.target.value)));

export default function DetailsForm({ data }) {
  const dispatch = useDispatch();
  const makeOnChangeHandler = makeSetData(dispatch);

  return (
    <Form>
      <FormRow
        labelText="Name:"
        propName="name"
        value={data.name || ''}
        onChange={makeOnChangeHandler('name')}
      />
      <FormRow labelText="Language:">
        <Col xs={2}>
          <FormSelect
            currentVal={data.langFrom}
            onChange={makeOnChangeHandler('langFrom')}
          />
        </Col>
        <Col xs={2}>
          <FormSelect
            currentVal={data.langTo}
            onChange={makeOnChangeHandler('langTo')}
          />
        </Col>
      </FormRow>
      <FormRow
        propName="url"
        labelText="URL:"
        colSize={10}
        value={decodeURIComponent(data.url) || ''}
        readOnly
      />
      <Row>
        <Col xs={8}>
          <Container fluid className="p-0">
            <FormRow propName="type" labelText="Type:" labelSize={3}>
              <Col xs={3}>
                <FormSelect
                  currentVal={data.type}
                  options={['spoutnik', 'tf']}
                  onChange={makeOnChangeHandler('type')}
                />
              </Col>
            </FormRow>
            <FormRow
              colSize={9}
              labelText="Model location:"
              labelSize={3}
              propName="model"
              value={data.model || ''}
              onChange={makeOnChangeHandler('model')}
              className={data.type !== 'spoutnik' ? 'd-none' : ''}
            />
            <FormRow
              labelText="Loadbalanced:"
              labelSize={3}
              className={data.type !== 'spoutnik' ? 'd-none' : ''}
            >
              <Col xs={5}>
                <input
                  type="checkbox"
                  className="align-bottom"
                  checked={data.loadbalanced === true}
                  onChange={makeOnChangeHandler(
                    'loadbalanced',
                    () => !data.loadbalanced,
                  )}
                />
              </Col>
            </FormRow>
            <FormRow
              colSize={6}
              labelText="tuneId:"
              labelSize={3}
              propName="tuneId"
              value={data.tuneId || ''}
              onChange={makeOnChangeHandler('tuneId')}
              className={data.type !== 'tf' ? 'd-none' : ''}
            />
            <FormRow
              colSize={6}
              labelText="modelId:"
              labelSize={3}
              propName="modelId"
              value={data.modelId || ''}
              onChange={makeOnChangeHandler('modelId')}
              className={data.type !== 'tf' ? 'd-none' : ''}
            />
            <FormRow
              colSize={6}
              labelText="Extra parameters:"
              labelSize={3}
              propName="extraParams"
              value={data.extraParams || ''}
              onChange={makeOnChangeHandler('extraParams')}
            />
          </Container>
        </Col>
        <Col xs={3} className="mr-auto ml-auto">
          <Card>
            <CardHeader tag="h5">Preprocessors</CardHeader>
            <CardBody>
              <FormGroup check>
                <Label for="accent" check>
                  <Input
                    type="checkbox"
                    id="accent"
                    checked={data.preprocessors.accent === true}
                    onChange={makeOnChangeHandler(
                      'preprocessors.accent',
                      () => !data.preprocessors.accent,
                    )}
                  />
                  Accent
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label for="casing" check>
                  <Input
                    type="checkbox"
                    id="casing"
                    checked={data.preprocessors.casing === true}
                    onChange={makeOnChangeHandler(
                      'preprocessors.casing',
                      () => !data.preprocessors.casing,
                    )}
                  />
                  Casing
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label for="filter" check>
                  <Input
                    type="checkbox"
                    id="filter"
                    checked={data.preprocessors.filter === true}
                    onChange={makeOnChangeHandler(
                      'preprocessors.filter',
                      () => !data.preprocessors.filter,
                    )}
                  />
                  Filter
                </Label>
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Form>
  );
}

DetailsForm.propTypes = {
  data: PropTypes.object,
};
