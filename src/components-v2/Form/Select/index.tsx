import React, { FC } from 'react';

import clsx from 'clsx';

const Select: FC<ISelectProps> = ({ value, className, onChange, children, ...props }) => {
  return (
    <select {...props} className={clsx('aracar-form__select', className)} value={value} onChange={onChange}>
      {children}
    </select>
  );
};

interface ISelectProps {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export default Select;
