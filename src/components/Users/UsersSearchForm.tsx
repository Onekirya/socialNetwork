import { ErrorMessage, Field, Form, Formik } from "formik";
import { isSubmitting } from "redux-form";
import { FilterType } from "../../redux/usersReducer";
import { FC } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../../redux/users-selectors";

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type FormType = {
  term: string;
  friend: "true" | "false" | "null";
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

export const UsersSearchForm: FC<PropsType> = React.memo((props) => {
  const filter = useSelector(getUsersFilter);

  const submit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const filter: FilterType = {
      term: values.term,
      friend:
        values.friend === "null"
          ? null
          : values.friend === "true"
          ? true
          : false,
    };
    props.onFilterChanged(filter);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ term: filter.term, friend: String(filter.friend) }}
        validate={usersSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
