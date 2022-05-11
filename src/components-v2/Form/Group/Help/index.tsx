import React, { FC } from 'react';

import clsx from 'clsx';

interface IFormGroupHelpProps {
  className?: string;
  text: string;
  type?: 'error' | 'warning';
}

const FormGroupHelp: FC<IFormGroupHelpProps> = ({ className, children, text, type, ...props }) => {
  const typeClassName = React.useMemo(() => {
    if (type === 'error') {
      return 'group-help--error';
    }

    if (type === 'warning') {
      return 'group-help--warning';
    }

    return '';
  }, [type]);

  return (
    <span {...props} className={clsx('group-help', typeClassName, className)}>
      {text}
    </span>
  );
};

export default FormGroupHelp;
