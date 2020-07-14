import React from "react";
import { Form, Field } from "react-final-form";
import "./RunForm.scss";
export default function RunForm(props) {
  const onSubmit = (formValues) => {
    props.onSubmit(formValues);
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => {
          return (
            <form className="ui form run-form massive" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="">Name</label>
                <Field name="name" component="input" defaultValue="" />
              </div>
              <div className="field">
                <label htmlFor="">Description</label>
                <Field name="description" component="input" defaultValue="" />
              </div>
              <div className="field">
                <label htmlFor="">Distance</label>
                <Field
                  name="distance"
                  type="number"
                  component="input"
                  defaultValue={0}
                />
              </div>
              <div className="field">
                <label htmlFor="">Length</label>
                <Field
                  name="length"
                  type="number"
                  component="input"
                  defaultValue={0}
                />
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
