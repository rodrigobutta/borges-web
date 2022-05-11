import React from 'react';
import { Radio, Select, Checkbox, DatePicker } from 'antd';
import moment from 'moment';
import MaskedInput from 'antd-mask-input';
import { TextInput, CpfInput, NumberInput } from './Inputs';
import File from './File';
import { isEmpty } from 'lodash';

const styles = {
  cpf: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    width: 'max-content',
    fontSize: 14,
  },

  borderMake: (value: any) => {
    if (value) {
      return {
        borderColor: '#FF4D4F',
      };
    }
  },
  error: {
    marginBottom: 0,
    color: '#FF4D4F',
  },
};

const DATE_VIEW_FORMAT = 'DD/MM/YYYY';
const DATE_SAVE_FORMAT = 'YYYY-MM-DD';

const plainOptions = ['Sim', 'Não'];

export default function FormFieldWrapper({
  field,
  onChange,
  onBlur = null,
  onFocus = null,
  handleCpf = null,
  propsToPatch,
  errors,
  entity,
  submitted,
  disabledFn = null,
}: any) {
  const fieldChanged = (propsToPatch: any, field: any) => {
    if (isEmpty(propsToPatch)) {
      return false;
    } else {
      return field.name in propsToPatch;
    }
  };

  // For Group of Checkboxes
  const fetchCheckboxStatus = (fieldName: string) => {
    if (entity[fieldName] === true) {
      return ['Sim'];
    } else if (entity[fieldName] === false) {
      return ['Não'];
    } else if (entity[fieldName] === null) {
      return [];
    } else {
      console.log('notCaptured');
    }
  };

  const toggleCheckbox = (optClicked: any, fieldName: string) => {
    var selected;

    if (optClicked.length === 2) {
      selected = [...optClicked].filter((x: any) => !fetchCheckboxStatus(fieldName)?.includes(x));
    } else {
      selected = optClicked;
    }
    if (isEmpty(selected)) {
      onChange(fieldName, null);
    } else if (selected[0] === 'Sim') {
      onChange(fieldName, true);
    } else if (selected[0] === 'Não') {
      onChange(fieldName, false);
    }
  };

  const isDisabled = (field: any) => {
    if (disabledFn && typeof disabledFn === 'function') {
      return disabledFn(field);
    } else {
      return field.hasOwnProperty('disabled') ? field.disabled : false;
    }
  };

  const onChangeDate = (name: string, date: any, _dateString: string) => {
    const formatted = date ? date.format(DATE_SAVE_FORMAT) : null;
    onChange(name, formatted);
  };

  const onChangeMaskedNumbers = (name: string, value: any) => {
    const onlyNumbers = value ? value.replace(/[^0-9]/g, '') : null;
    onChange(name, onlyNumbers);
  };

  return (
    <>
      {field.type === 'radio' && (
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'block',
              flex: '0 0 33.33333333%',
              maxWidth: '33.33333333%',
            }}
            className='ant-form-item-label'
          >
            <label>{field.label}</label>
          </div>
          <div
            style={{
              display: 'block',
              flex: '1 1',
              maxWidth: '66.6666666%',
            }}
          >
            <Radio.Group defaultValue={field.radioOp[0].key} buttonStyle='solid' disabled={isDisabled(field)}>
              {field.radioOp.map((r: any) => {
                return <Radio.Button value={r.key}>{r.label}</Radio.Button>;
              })}
            </Radio.Group>
          </div>
        </div>
      )}

      {field.type === 'text' && (
        <TextInput
          size={'large'}
          error={errors[field.name]}
          onChange={onChange}
          transform={field.transform}
          submitted={submitted}
          label={field.label}
          placeholder={field.placeholder}
          entity={entity}
          name={field.name}
          disabled={isDisabled(field)}
        />
      )}

      {field.type === 'number' && (
        <NumberInput
          size={'large'}
          error={errors[field.name]}
          onChange={onChange}
          transform={field.transform}
          submitted={submitted}
          label={field.label}
          placeholder={field.placeholder}
          entity={entity}
          name={field.name}
          disabled={isDisabled(field)}
        />
      )}

      {field.type === 'email' && (
        <TextInput
          size={'large'}
          error={errors[field.name]}
          onChange={onChange}
          transform={field.transform}
          submitted={submitted}
          label={field.label}
          placeholder={field.placeholder}
          entity={entity}
          name={field.name}
          disabled={isDisabled(field)}
        />
      )}

      {field.type === 'option' && (
        <div
          className={`ant-row ant-form-item ${submitted && errors[field.name] && 'ant-form-item-has-error'}`}
          key={field.name}
        >
          <div
            style={{
              display: 'block',
              flex: '0 0 33.33333333%',
              maxWidth: '33.33333333%',
            }}
            className='ant-form-item-label ant-form-item-label-wrap'
          >
            <label>{field.label}</label>
          </div>
          <div
            style={{
              display: 'block',
              flex: '1 1',
              maxWidth: '66.6666666%',
            }}
          >
            <Select
              placeholder={field.placeholder || 'Selecionar'}
              style={{ width: '100%' }}
              onChange={p => onChange(field.name, p)}
              value={entity[field.name]}
              options={
                field.options &&
                field.options.map((x: any) => ({
                  label: x.label,
                  value: x.value,
                }))
              }
              disabled={isDisabled(field)}
            ></Select>
            {submitted && errors[field.name] && <p style={styles.error}>{errors[field.name]}</p>}
          </div>
        </div>
      )}

      {field.type === 'checkbox' && (
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'block',
              flex: '0 0 42%',
              maxWidth: '42%',
            }}
            className='ant-form-item-label'
          >
            <label>
              {field.required ? (
                <div>
                  <span style={{ color: 'red' }}>* </span>
                  {field.label}
                </div>
              ) : (
                field.label
              )}
            </label>
          </div>
          <div
            style={{
              display: 'block',
              flex: '1 1',
              maxWidth: '58%',
            }}
          >
            <Checkbox.Group
              value={fetchCheckboxStatus(field.name)}
              options={plainOptions}
              disabled={isDisabled(field)}
              onChange={p => {
                toggleCheckbox(p, field.name);
              }}
              style={{
                width: '100%',
                position: 'relative',
                top: '10px',
                marginBottom: '5px',
              }}
            />
            {field.name.includes('isPep') && (
              <p
                style={{
                  fontSize: '0.5rem',
                  marginTop: 4,
                  marginLeft: -39,
                  color: '#33bbe1',
                }}
              >
                Pessoa Exposta Politicamente
              </p>
            )}
            {fieldChanged(propsToPatch, field) && errors[field.name] && (
              <p style={styles.error}>{errors[field.name]}</p>
            )}
          </div>
        </div>
      )}

      {/* {field.type === "checkbox" && (
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "block",
              flex: "0 0 33.33333333%",
              maxWidth: "33.33333333%",
            }}
            className="ant-form-item-label"
          >
            <label>{field.label}</label>
          </div>
          <div
            style={{
              display: "block",
              flex: "1 1",
              maxWidth: "66.6666666%",
            }}
          >
            <Checkbox
              checked={entity[field.name]}
              onChange={(p) => onChange(field.name, p.target.checked)}
              style={{ position: "relative", top: "10px" }}
              disabled={isDisabled(field)}
            ></Checkbox>
          </div>
        </div>
      )} */}

      {field.type === 'file' && (
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'block',
              flex: '0 0 33.33333333%',
              maxWidth: '33.33333333%',
            }}
            className='ant-form-item-label'
          >
            <label>{field.label}</label>
          </div>
          <div
            style={{
              display: 'block',
              flex: '1 1',
              maxWidth: '66.6666666%',
            }}
          >
            <File
              endpoint={field.uploadEndpoint}
              name={field.name}
              onChange={onChange}
              valueName={entity[`${field.name}.name`] || entity[field.name]?.name}
              valueUrl={entity[`${field.name}.url`] || entity[field.name]?.url}
              label={field.label}
              disabled={isDisabled(field)}
            />
          </div>
        </div>
      )}

      {field.type === 'date' && (
        <div className='ant-row ant-form-item' key={field.name}>
          <div
            style={{
              display: 'block',
              flex: '0 0 33.33333333%',
              maxWidth: '33.33333333%',
            }}
            className='ant-form-item-label ant-form-item-label-wrap'
          >
            <label>{field.label}</label>
          </div>
          <div
            style={{
              display: 'block',
              flex: '1 1',
              maxWidth: '66.6666666%',
            }}
          >
            <DatePicker
              name={field.name}
              defaultValue={entity[field.name] && moment(entity[field.name], DATE_SAVE_FORMAT)}
              format={DATE_VIEW_FORMAT}
              onChange={(date, dateString) => onChangeDate(field.name, date, dateString)}
              placeholder='DD/MM/AAAA'
              disabled={isDisabled(field)}
            />
          </div>
        </div>
      )}

      {field.type === 'cpf' && (
        <CpfInput
          size={'large'}
          error={errors[field.name]}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          handleCpf={handleCpf}
          transform={field.transform}
          submitted={submitted}
          label={field.label}
          placeholder={field.placeholder}
          entity={entity}
          name={field.name}
          disabled={isDisabled(field)}
          maxlength={8}
        />
      )}

      {field.type === 'cellPhone' && (
        <div className='ant-row ant-form-item' key={field.name}>
          <div
            style={{
              display: 'block',
              flex: '0 0 33.33333333%',
              maxWidth: '33.33333333%',
            }}
            className='ant-form-item-label'
          >
            <label>{field.label}</label>
          </div>
          <div
            style={{
              display: 'block',
              flex: '1 1',
              maxWidth: '66.6666666%',
            }}
          >
            <MaskedInput
              mask='+55 (11) 11111-1111'
              // mask="+598 (111) 111-111" //*old mask
              style={styles.borderMake(errors[field.name])}
              className={`nico ant-input ant-input-lg ${errors[field.name] && 'error-text-fields'}`}
              value={entity[field.name]}
              placeholder='Digite o celular'
              name={field.name}
              autoComplete={'off'}
              size={'small'}
              onChange={e => onChangeMaskedNumbers(field.name, e.target.value)}
              disabled={isDisabled(field)}
            />
            {errors[field.name] && <p style={styles.error}>{errors[field.name]}</p>}
          </div>
        </div>
      )}
      {field.type === 'phone' && (
        <div className='ant-row ant-form-item' key={field.name}>
          <div
            style={{
              display: 'block',
              flex: '0 0 33.33333333%',
            }}
            className='ant-form-item-label'
          >
            <label>
              {field.required ? (
                <div>
                  <span style={{ color: 'red' }}>* </span>
                  {field.label}
                </div>
              ) : (
                field.label
              )}
            </label>
          </div>
          <div
            style={{
              display: 'block',
              flex: '1 1',
              maxWidth: '66,66%',
            }}
          >
            <MaskedInput
              mask='+55 (11) 1111-1111'
              style={styles.borderMake(errors[field.name])}
              className={`ant-input ant-input-lg ${errors[field.name] && 'error-text-fields'}`}
              value={entity[field.name]}
              placeholder='Digite o telefone'
              name={field.name}
              autoComplete={'off'}
              size={'small'}
              onChange={e => onChangeMaskedNumbers(field.name, e.target.value)}
              disabled={isDisabled(field)}
            />
            {errors[field.name] && <p style={styles.error}>{errors[field.name]}</p>}
          </div>
        </div>
      )}
    </>
  );
}
