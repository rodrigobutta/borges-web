import React, { useState } from 'react';
import { Tag, Input, Form, Button } from 'antd';
import format from 'utils/format';
import { FIELD_TYPES } from '../constants';
import { EditOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';

const trad = {
  model: 'Modelo',
  brand: 'Marca',
  makerCountry: 'Origem',
  year: 'Ano',
  color: 'Cor',
  vehiclePriceAmount: 'Preço de Catálogo',
  type: 'Tipo',
  vin: 'Chassi',
  accountId: 'Conta',
  from: 'De',
  to: 'Até',
};

export default function WishItem({ wish, onUpdate }) {
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

  const onChange = async values => {
    setSubmitting(true);

    await onUpdate({ ...values, saved: true }, wish.id);

    setSubmitting(false);
    setEditing(false);
  };

  const onDelete = () => {
    setDeleting(true);
    onUpdate({ saved: false }, wish.id);
  };

  const disableButtons = submitting || deleting;

  return (
    <section className='whishlist-list'>
      <div>
        <div className='whishlist-vendedor'>
          <div>
            <small>Vendedor:</small>
            {wish['user'].firstName} {wish['user'].lastName}
          </div>
          <span>{format(wish['createdAt'], FIELD_TYPES.RELATIVE_TIME)}</span>
        </div>
        {
          <div className='whishlist-items'>
            {wish['queryItems'].map(x => (
              <Tag color='blue'>
                <small>{trad[x.key] || x.key}:</small> <strong>{x.value}</strong>
              </Tag>
            ))}
          </div>
        }
        <div
          style={{
            margin: '10px 5% 10px 0',
            height: '1px',
            backgroundColor: 'rgba(0, 86, 216, 0.15)',
          }}
        />
        <div style={{ position: 'relative', width: '95%' }}>
          <Form onFinish={onChange} initialValues={{ comment: wish['comment'] }}>
            <Form.Item title={'Comments'} name={'comment'} style={{ margin: 0 }} disabled={editing}>
              <Input.TextArea
                disabled={!editing}
                style={{
                  background: 'none',
                  resize: 'none',
                  width: '94%',
                  borderRadius: '5px',
                }}
                value={wish['comment']}
              />
            </Form.Item>
            <Button
              className='whishlist-btnedit'
              hidden={editing}
              icon={<EditOutlined />}
              type='primary'
              htmlType='button'
              onClick={() => setEditing(true)}
              disabled={disableButtons}
            />
            <Button
              className='whishlist-btnedit'
              icon={<CheckCircleOutlined />}
              hidden={!editing}
              type='primary'
              htmlType='submit'
              disabled={disableButtons}
              loading={submitting}
            />
          </Form>
        </div>
      </div>
      <div className='whishlist-value'>
        <div className='whishlist-list-closebtn'>
          <Button
            icon={<DeleteOutlined />}
            type='primary'
            htmlType='button'
            disabled={disableButtons}
            onClick={onDelete}
            loading={deleting}
          />
        </div>
        <span className='whishlist-value-values'>
          <small>Desde </small>
          {wish.queryItems.year?.from || 'R$--'}
        </span>
        <span className='whishlist-value-values'>
          <small>Hasta</small>
          {wish.queryItems.year?.to || 'R$--'}
        </span>
      </div>
    </section>
  );
}
