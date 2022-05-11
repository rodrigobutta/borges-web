import React from 'react';

import { IFormikFieldWrapper, defaultLabelAlign, defaultSpanProportion } from '.';

import SelectFieldWrapper from './SelectFieldWrapper';
import TextFieldWrapper from './TextFieldWrapper';
import NumberFieldWrapper from './NumberFieldWrapper';
import EmailFieldWrapper from './EmailFieldWrapper';
import CellphoneFieldWrapper from './CellphoneFieldWrapper';

// Dedicated
import UserSelectFieldWrapper from './dedicatedWrapper/UserSelectFieldWrapper';
import StateSelectFieldWrapper from './dedicatedWrapper/StateSelectFieldWrapper';

const FormikFieldWrapper: React.FC<IFormikFieldWrapper> = props => {
  if (props.type === 'select') {
    return (
      <SelectFieldWrapper
        label={props.label}
        labelAlign={props.labelAlign || defaultLabelAlign}
        name={props.name}
        options={props.options}
        type={props.type}
        disabled={props.disabled}
        error={props.error}
        touched={props.touched}
        spanProportion={props.spanProportion || defaultSpanProportion}
      />
    );
  }

  if (props.type === 'text') {
    return (
      <TextFieldWrapper
        label={props.label}
        labelAlign={props.labelAlign || defaultLabelAlign}
        name={props.name}
        type={props.type}
        disabled={props.disabled}
        error={props.error}
        touched={props.touched}
        spanProportion={props.spanProportion || defaultSpanProportion}
      />
    );
  }

  if (props.type === 'number') {
    return (
      <NumberFieldWrapper
        label={props.label}
        labelAlign={props.labelAlign || defaultLabelAlign}
        name={props.name}
        type={props.type}
        disabled={props.disabled}
        error={props.error}
        touched={props.touched}
        spanProportion={props.spanProportion || defaultSpanProportion}
      />
    );
  }

  if (props.type === 'email') {
    return (
      <EmailFieldWrapper
        label={props.label}
        labelAlign={props.labelAlign || defaultLabelAlign}
        name={props.name}
        type={props.type}
        disabled={props.disabled}
        error={props.error}
        touched={props.touched}
        spanProportion={props.spanProportion || defaultSpanProportion}
      />
    );
  }

  if (props.type === 'cellphone') {
    return (
      <CellphoneFieldWrapper
        label={props.label}
        labelAlign={props.labelAlign || defaultLabelAlign}
        name={props.name}
        type={props.type}
        disabled={props.disabled}
        error={props.error}
        touched={props.touched}
        spanProportion={props.spanProportion || defaultSpanProportion}
        setFieldValue={props.setFieldValue}
      />
    );
  }

  if (props.type === 'user-select') {
    return (
      <UserSelectFieldWrapper
        label={props.label}
        labelAlign={props.labelAlign || defaultLabelAlign}
        name={props.name}
        type={props.type}
        disabled={props.disabled}
        error={props.error}
        touched={props.touched}
        spanProportion={props.spanProportion || defaultSpanProportion}
      />
    );
  }

  if (props.type === 'state-select') {
    return (
      <StateSelectFieldWrapper
        label={props.label}
        labelAlign={props.labelAlign || defaultLabelAlign}
        name={props.name}
        type={props.type}
        disabled={props.disabled}
        error={props.error}
        touched={props.touched}
        spanProportion={props.spanProportion || defaultSpanProportion}
      />
    );
  }

  return <></>;
};

export default React.memo(FormikFieldWrapper);
