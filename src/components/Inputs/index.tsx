import { Form, Input } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import React from 'react';

export const TextInput = ({
  label,
  placeholder,
  entity,
  name,
  onChange,
  error,
  submitted,
  disabled,
  onKeyDown,
  maxlength,
}: any) => {
  return (
    <Form.Item label={label} validateStatus={error && submitted ? 'error' : 'success'} help={submitted && error}>
      <Input
        placeholder={placeholder}
        value={entity[name] || ''}
        disabled={disabled}
        onKeyDown={onKeyDown}
        maxLength={maxlength}
        onChange={e => onChange(name, e.target.value)}
      />
    </Form.Item>
  );
};

export const NumberInput = ({
  label,
  placeholder,
  entity,
  name,
  onChange,
  error,
  submitted,
  disabled,
  onKeyDown,
  maxlength,
}: any) => {
  return (
    <Form.Item label={label} validateStatus={error && submitted ? 'error' : 'success'} help={submitted && error}>
      <Input
        type='number'
        placeholder={placeholder}
        value={entity[name] || ''}
        disabled={disabled}
        onKeyDown={onKeyDown}
        maxLength={maxlength}
        onChange={e => onChange(name, e.target.value)}
      />
    </Form.Item>
  );
};

export const PasswordInput = ({ label, placeholder, entity, name, onChange, error, submitted, rules }: any) => {
  return (
    <Form.Item label={label} validateStatus={error && submitted ? 'error' : 'success'} help={submitted && error}>
      <Input.Password
        placeholder={placeholder}
        value={entity[name] || ''}
        onChange={e => onChange(name, e.target.value)}
        // rules={rules}
      />
    </Form.Item>
  );
};
export const TextInputWithRules = ({ name, label, rules, placeholder }: any) => {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};

export const RegisterPassword = ({ name, label, rules, placeholder }: any) => {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Input.Password placeholder={placeholder} />
    </Form.Item>
  );
};

export const CpfInput = ({
  label,
  placeholder,
  entity,
  name,
  onChange,
  handleCpf,
  error,
  submitted,
  disabled,
  onKeyDown,
  maxlength,
}: any) => {
  const styles = {
    cpf: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: 10,
      paddingRight: 7,
      color: '#33bbe1',
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

  const removeMask = (e: any, name: any, onChange: any) => {
    const removePoint = e.target.value.split('.').join('');
    const removeDash = removePoint.split('-').join('');
    const result = removeDash.split('_').join('');
    onChange(name, result);
  };

  return (
    <Form.Item
      label={label}
      validateStatus={error && submitted ? 'error' : 'success'}
      help={submitted && error}
      style={{ marginBottom: '5px' }}
    >
      <MaskedInput
        mask='111.111.111-11'
        style={styles.borderMake(error ? error[name] : null)}
        className={`ant-input ant-input-lg
          ${error ? error[name] && 'error-text-fields' : ''}`}
        value={entity[name]}
        placeholder={placeholder}
        autoComplete={'off'}
        name={name}
        // size={"11"}
        onChange={e => {
          removeMask(e, name, onChange);

          if (typeof handleCpf === 'function') {
            handleCpf(e);
          }
        }}
        disabled={disabled}
        onKeyDown={onKeyDown}
      />
      {/* <Input
        placeholder={placeholder}
        value={entity[name] || ""}
        disabled={disabled}
        onKeyDown={onKeyDown}
        maxLength={maxlength}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={(e) => {
          onChange(name, e.target.value);
          handleCpf(e);
        }}
      /> */}
    </Form.Item>
  );
};
