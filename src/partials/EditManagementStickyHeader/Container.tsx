import React, { FC } from 'react';

import clsx from 'clsx';

const StickyHeaderContainer: FC<IStickyHeaderContainerProps> = ({ className, ...props }) => {
  return <div className={clsx('edit-management-sticky-header--container', className)} {...props} />;
};

interface IStickyHeaderContainerProps {
  className?: string;
}

export default StickyHeaderContainer;
