import React from 'react';

import { Card, Col, notification, Row } from 'antd';

import { Formik, FormikHelpers, FormikProps } from 'formik';

import { useAxios } from 'hooks';

import { useAuth } from 'providers/AuthProvider';

import { EditManagementHeaderPartial } from 'partials';

import { FormikFieldWrapper, parseFieldsToFormikInitialValues } from 'utils/react-related';

import {
  CARD_TITLE,
  FORMIK_FIELD_SPAN_PROPORTION,
  FORMIK_FIELD_LABEL_ALIGN,
  PROPERTY_DELETED_ON_SUBMIT,
  formikFields,
  buildPatchAccountEndpoint,
  formikValidationSchema,
} from '.';
import { Account } from 'models/Account';

const PreferencesGeneral = () => {
  const axios = useAxios();
  const { auth } = useAuth();

  const [editData] = React.useState<Account>();
  const [isEditing, setIsEditing] = React.useState(false);

  const [showCancelarButton, setShowCancelarButton] = React.useState(false);
  const [showGuardarButton, setShowGuardarButton] = React.useState(false);
  const [showEditarButton, setShowEditarButton] = React.useState(false);

  const formInitialValues = React.useMemo(() => {
    const output = parseFieldsToFormikInitialValues(formikFields, editData);
    return output;
  }, [editData]);

  const formikRef = React.useRef<FormikProps<typeof formInitialValues>>(null);

  const clickCancelar = React.useCallback(() => {
    if (!formikRef.current) {
      return;
    }

    const { resetForm } = formikRef.current;

    resetForm();
    setIsEditing(false);

    setShowCancelarButton(false);
    setShowGuardarButton(false);
    setShowEditarButton(true);
  }, []);

  const clickEditar = React.useCallback(() => {
    setIsEditing(true);

    setShowCancelarButton(true);
    setShowGuardarButton(true);
    setShowEditarButton(false);
  }, []);

  const clickGuardar = React.useCallback(() => {
    if (!formikRef.current) {
      return;
    }

    const { handleSubmit } = formikRef.current;

    handleSubmit();
  }, []);

  const onSubmit = React.useCallback(
    (data: typeof formInitialValues, { setSubmitting }: FormikHelpers<typeof formInitialValues>) => {
      if (!auth?.profile?.accountId) return;

      const submitData = { ...data };
      delete submitData[PROPERTY_DELETED_ON_SUBMIT];

      axios
        ?.patch(buildPatchAccountEndpoint(auth?.profile?.accountId), submitData)
        .then(() => {
          setIsEditing(false);
          setShowGuardarButton(false);
        })
        .catch(e => {
          notification.error({
            message: e.message,
            key: '1',
            duration: 6,
          });
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
    [axios, auth],
  );

  if (!editData) {
    return <></>;
  }

  return (
    <Card title={CARD_TITLE}>
      <EditManagementHeaderPartial
        onClickCancelar={clickCancelar}
        onClickEditar={clickEditar}
        onClickGuardar={clickGuardar}
        showCancelarButton={showCancelarButton}
        showGuardarButton={showGuardarButton}
        showEditarButton={showEditarButton}
      />
      <Formik
        innerRef={formikRef}
        initialValues={formInitialValues}
        onSubmit={onSubmit}
        validationSchema={formikValidationSchema}
      >
        {({ errors, touched, isSubmitting, handleChange, setFieldValue }) => (
          <Row>
            {formikFields.map(x => (
              <Col key={x.name} span={12} className='px-1'>
                <FormikFieldWrapper
                  key={x.name}
                  spanProportion={FORMIK_FIELD_SPAN_PROPORTION}
                  disabled={!isEditing || isSubmitting}
                  labelAlign={FORMIK_FIELD_LABEL_ALIGN}
                  error={errors[x.name]}
                  touched={touched[x.name]}
                  {...x}
                />
              </Col>
            ))}
          </Row>
        )}
      </Formik>
    </Card>
  );
};

export default PreferencesGeneral;
