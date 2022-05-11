import React from 'react';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface PaginationControlsProps {
  itemsPerPage: number;
  itemsCount: number;
  currentPage: number;
  onPageClick: any;
}

export default function PaginationControls({
  itemsPerPage = 0,
  itemsCount = 0,
  currentPage = 1,
  onPageClick = null,
}: PaginationControlsProps) {
  const handlePrevPageClick = () =>
    onPageClick && typeof onPageClick === 'function' && onPageClick(Math.max(currentPage - 1, 1));

  const handleNextPageClick = () => onPageClick && typeof onPageClick === 'function' && onPageClick(currentPage + 1);

  if (itemsCount === 0 || itemsPerPage === 0 || currentPage === 0) {
    return null;
  }

  const labelFrom = Math.max(itemsPerPage * (currentPage - 1), 1);

  const labelTo = Math.min(itemsPerPage * currentPage, itemsCount);

  const prevButtonDisabled = currentPage === 1;

  const nextButtonDisabled = currentPage * itemsPerPage > itemsCount;

  return (
    <div
      className={'p-1 mb-2'}
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <span className={'mr-2'}>{`${labelFrom}-${labelTo} de ${itemsCount} registros`}</span>
      <Button
        // type="secondary"
        disabled={prevButtonDisabled}
        icon={<LeftOutlined />}
        onClick={handlePrevPageClick}
      />
      <Button
        // type="secondary"
        disabled={nextButtonDisabled}
        icon={<RightOutlined />}
        className={'mr-3'}
        onClick={handleNextPageClick}
      />
    </div>
  );
}
