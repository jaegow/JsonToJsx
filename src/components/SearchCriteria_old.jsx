/* eslint-disable jsx-a11y/label-has-associated-control,react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { createSelector } from 'reselect';
import { loadSearchCriteriaConfig } from '../store/actions/searchCriteriaActions';
import TextInput from './Form/TextInput';
import RadioGroup from './Form/RadioGroup';
import CheckboxGroup from './Form/CheckboxGroup';
import Select from './Form/Select';
import { buildLoggers } from '../utils/log';
import './SearchCriteria.scss';

const { log } = buildLoggers('SearchCriteria_old');

const configSelector = createSelector(
  (state) => state.SearchCriteria.config,
  (config) => config,
);

const onSubmit = (values) => {
  // same shape as initial values
  log('onSubmit', { values });
};

// todo: replace with api validation when available
// Async Validation
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const validate = (values) => sleep(1000).then(() => {
  // log('validate', { values });
  const errors = {};
  if (!values.test || !values.test.length) {
    errors.test = 'Nice try';
  }
  // log('validate', { errors });
  return errors;
});

const country_options = [
  { value: 'usa', text: 'USA' },
  { value: 'canada', text: 'Canada' },
];

const matchingSet_options = [
  { value: 'red', text: 'Red' },
  { value: 'green', text: 'Green' },
  { value: 'blue', text: 'Blue' },
];

const contract_status_options = [
  { value: 'active', text: 'Active' },
  { value: 'inactive', text: 'Inactive' },
];

const dealer_record_status_options = [
  { value: 'active', text: 'Active' },
  { value: 'hold', text: 'Hold' },
  { value: 'inactive', text: 'Inactive' },
];

const import_date_options = [
  { value: 'active', text: 'Active' },
  { value: 'hold', text: 'Hold' },
  { value: 'inactive', text: 'Inactive' },
];

const initialValues = {
  Country: country_options.map(({ value }) => value),
  ZipPostalCode: undefined,
  MatchingSet: undefined,
  AANShipto: undefined,
  HQAANShipto: undefined,
  BillTo: undefined,
  DealerName: undefined,
  ContractStatus: undefined,
  DealerRecordStatus: undefined,
  CustAccNumber: undefined,
  DistBTName: undefined,
  CustAddress816: undefined,
  CustName816: undefined,
  Import816Dates: undefined,
};

function SearchCriteria_old() {

  const config = useSelector(configSelector);
  const dispatch = useDispatch();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //
    dispatch(loadSearchCriteriaConfig());

    // Similar to componentWillUnmount
    // return;
  });


  return (
    <div className="search-criteria">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
        {(formik) => {
          const { values } = formik;
          log('formik render', { values });
          return (
            <Form className="u-v-flow-s">

              <span className="form-headline">Matching Filters</span>

              <RadioGroup name="Country" label="Country" setFieldValue={formik.setFieldValue} options={country_options} />

              <div className="u-h-flow-s">
                <TextInput name="ZipPostalCode" label="Zip / Postal Code" placeholder="Zip / Postal Code" />
                <Select name="MatchingSet" label="Matching Set" options={matchingSet_options} />
              </div>

              <div className="is-divider" />

              <h4>Dealer Record Filters</h4>

              <div className="u-h-flow-s">
                <TextInput name="AANShipto" label="AAN/Ship To" />
                <TextInput name="HQAANShipto" label="HQ AAN/Ship To" />
              </div>

              <div className="u-h-flow-s is-split">
                <TextInput name="BillTo" label="Bill To" />
              </div>

              <div className="u-h-flow-s is-split">
                <TextInput name="DealerName" label="Dealer Name" />
              </div>

              <div className="u-h-flow-s">
                <RadioGroup name="ContractStatus" label="Contract Status" setFieldValue={formik.setFieldValue} options={contract_status_options} />
                <CheckboxGroup name="DealerRecordStatus" label="Dealer Record Status" setFieldValue={formik.setFieldValue} options={dealer_record_status_options} />
              </div>

              <div className="is-divider" />

              <h4>816 Filters</h4>

              <div className="u-h-flow-s is-split">
                <TextInput name="CustAccNumber" label="Customer Account Number" />
              </div>

              <div className="u-h-flow-s is-split">
                <TextInput name="DistBTName" label="Distributor BT/Name" />
              </div>

              <div className="u-h-flow-s is-split">
                <TextInput name="CustAddress816" label="816 Customer Address" />
              </div>

              <div className="u-h-flow-s is-split">
                <TextInput name="CustName816" label="816 Customer Name" />
              </div>

              <div className="u-h-flow-s is-split">
                <Select name="Import816Dates" label="816 Import Date" options={import_date_options} />
              </div>

              <div className="field">
                <div className="control">
                  <button className="button" type="submit">Submit</button>
                </div>
              </div>

            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default SearchCriteria_old;

/*
Models:

export interface WsAADManualVerificationSearchDetails {
    Country: 0000,
    ZipPostalCode: 0000,
    MatchingSet: 0000,
    AANShipto: 0000,
    HQAANShipto: 0000,
    BillTo: 0000,
    DealerName: 0000,
    ContractStatus: 0000,
    DealerRecordStatus: 0000,
    CustAccNumber: 0000,
    DistBTName: 0000,
    CustAddress816: 0000,
    CustName816: 0000,
    Import816Dates: 0000,
}

export interface WsMatchingSet816 {
    MatchingSetId: number;
    MatchingSetDesc: 0000,
}

export interface WsImport816Dates {
    ImportDateId: number;
    Import816Date: Date;
}

MockData:

export var MatchingSet: aadModels.WsMatchingSet816[] =
    [
        { value: 1, text: "All 816s", selected: true },
        { MatchingSetId: 2, MatchingSetDesc: "Unmatched 816" },
        { MatchingSetId: 3, MatchingSetDesc: "Unmatched Dealer Verified" },
        { MatchingSetId: 4, MatchingSetDesc: "Matched 816" }
    ];

export var Import816Dates: aadModels.WsImport816Dates[] =
    [
        { value: 1, text: "All 816s", selected: true },
        { ImportDateId: 1, Import816Date: new Date(2019, 10, 5) },
        { ImportDateId: 2, Import816Date: new Date(2019, 10, 5) },
        { ImportDateId: 3, Import816Date: new Date(2019, 8, 15) },
        { ImportDateId: 4, Import816Date: new Date(2019, 6, 5) }
    ];

export var AADManualVerificationSearchDetails: aadModels.WsAADManualVerificationSearchDetails = {
    Country: "USA",
    ZipPostalCode: "48083",
    MatchingSet: [{ MatchingSetId: 1, MatchingSetDesc: "All 816s" }],
    AANShipto: "1003207",
    HQAANShipto: "1003208",
    BillTo: "1003206",
    DealerName: "Bauer",
    ContractStatus: ["active"],
    DealerRecordStatus: ["active", "hold"],
    CustAccNumber: "1003206",
    DistBTName: "Bauer",
    CustAddress816: "SC",
    CustName816: "Bauer",
    Import816Dates: [{ ImportDateId: 1, Import816Date: new Date(2019, 10, 5) }]
};


*/
