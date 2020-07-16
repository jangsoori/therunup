import React from "react";
import { Form, Field } from "react-final-form";
import "./RunForm.scss";

//FORM VALIDATION

const required = (value) => (value ? undefined : "Required");
const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);
const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
const maxValue = (max) => (value) =>
  isNaN(value) || value <= max
    ? undefined
    : `Should be smaller than ${max + 1}`;
const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export default function RunForm(props) {
  const onSubmit = (formValues) => {
    const {
      durationSeconds,
      durationH,
      durationMin,
      distanceKm,
      distanceM,
      name,
      description,
    } = formValues;
    props.onSubmit({
      name,
      description,
      durationSeconds,
      durationMin,
      durationH,
      distanceKm,
      distanceM,
      totalDurationSeconds:
        +durationSeconds + +durationMin * 60 + +durationH * 3600,

      totalDistanceMeters: +distanceM + +distanceKm * 1000,
    });
  };

  return (
    <div>
      <Form
        initialValues={props.initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => {
          return (
            <form className="ui form run-form massive" onSubmit={handleSubmit}>
              <div className="field">
                <Field name="name" validate={required} defaultValue="New run">
                  {({ input, meta }) => (
                    <React.Fragment>
                      <label htmlFor="">Name</label>
                      <div className="field-wrapper single">
                        <input {...input} type="text" />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    </React.Fragment>
                  )}
                </Field>
              </div>
              <div className="field">
                <Field name="description" component="input" defaultValue="">
                  {({ input, meta }) => (
                    <React.Fragment>
                      <label htmlFor="">Description</label>
                      <input {...input} type="text" />
                    </React.Fragment>
                  )}
                </Field>
              </div>
              <div className="field">
                <label>Distance</label>
                <div className="distance-fields-wrapper">
                  <Field
                    name="distanceKm"
                    component="input"
                    validate={composeValidators(mustBeNumber, minValue(0))}
                    defaultValue={0}
                    className="distance-field"
                  >
                    {({ input, meta }) => (
                      <div className="field-wrapper">
                        <div className="field-input">
                          <input {...input} type="number" />
                          <label htmlFor="">KM</label>
                        </div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field
                    name="distanceM"
                    type="number"
                    max={999}
                    component="input"
                    defaultValue={0}
                    className="distance-field"
                    validate={composeValidators(
                      mustBeNumber,
                      minValue(0),
                      maxValue(999)
                    )}
                  >
                    {({ input, meta }) => (
                      <div className="field-wrapper">
                        <div className="field-input">
                          <input {...input} type="number" />
                          <label htmlFor="">M</label>
                        </div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
              </div>
              <div className="field">
                <label htmlFor="">Duration</label>
                <div className="duration-fields-wrapper">
                  <Field
                    name="durationH"
                    type="number"
                    component="input"
                    defaultValue={0}
                    max={59}
                    validate={composeValidators(
                      mustBeNumber,
                      minValue(0),
                      maxValue(59)
                    )}
                  >
                    {({ input, meta }) => (
                      <div className="field-wrapper">
                        <div className="field-input">
                          <input {...input} type="number" />
                          <label htmlFor="">H</label>
                        </div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>

                  <Field
                    name="durationMin"
                    type="number"
                    component="input"
                    defaultValue={0}
                    max={59}
                    validate={composeValidators(
                      mustBeNumber,
                      minValue(0),
                      maxValue(59)
                    )}
                  >
                    {({ input, meta }) => (
                      <div className="field-wrapper">
                        <div className="field-input">
                          <input {...input} type="number" />
                          <label htmlFor="">MIN</label>
                        </div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>

                  <Field
                    name="durationSeconds"
                    type="number"
                    component="input"
                    defaultValue={0}
                    max={59}
                    validate={composeValidators(
                      mustBeNumber,
                      minValue(0),
                      maxValue(59)
                    )}
                  >
                    {({ input, meta }) => (
                      <div className="field-wrapper">
                        <div className="field-input">
                          <input {...input} type="number" />
                          <label htmlFor="">S</label>
                        </div>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
              </div>

              <button class="ui massive button" type="submit">
                Submit
              </button>
            </form>
          );
        }}
      />
    </div>
  );
}
