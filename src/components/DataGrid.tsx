import Paginator from './Paginator';
import { Button, Checkbox, ConfigProvider, Menu, Popover, Table } from 'antd';
import locale from 'antd/lib/locale/pt_BR';
import { BankOutlined, TableOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { pageSize } from '../constants';

export function DataGrid(props: any) {
  const {
    count,
    current,
    onFPAdd,
    onChange,
    columns,
    rowSelection,
    // showDrawer,
    drawer,
    loading,
    onTableChange,
    data,
  } = props;

  const [visibleColumns, setVisibleColumns] = useState([
    'vehicleBrandName',
    'vehicleFamilyName',
    'vehicleModelName',
    'status.name',
    'year',
    'location.name',
  ]);

  return (
    <div className={'p-2 bg-white'}>
      <div className={''}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            border: '1px solid #f0f0f0',
          }}
        >
          <div>
            <Button icon={<BankOutlined />} onClick={onFPAdd} type={'primary'}>
              Adicionar ao Floor Plan
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Paginator current={current} total={count} onChange={onChange} pageSize={pageSize} />
            <Popover
              title={<h3>Colunas</h3>}
              trigger={'click'}
              placement='bottomRight'
              content={
                <Menu>
                  {columns
                    .filter((x: any) => x.title)
                    .sort((a: any, b: any) => ('' + a.title).localeCompare(b.title))
                    .map((x: any) => {
                      const onChange1 = () =>
                        setVisibleColumns(prev => {
                          if (visibleColumns.includes(x.dataIndex)) {
                            return prev.filter(col => col !== x.dataIndex);
                          }
                          return [...prev, x.dataIndex];
                        });

                      return (
                        <Menu.Item onChange={onChange1} key={x.dataIndex}>
                          <Checkbox checked={visibleColumns.includes(x.dataIndex)}>{x.title}</Checkbox>
                        </Menu.Item>
                      );
                    })}
                </Menu>
              }
            >
              <Button type={'primary'} className={'ml-2'} size={'small'} icon={<TableOutlined />} />
            </Popover>
            {
              // <Button
              //   type={"primary"}
              //   size={"small"}
              //   className={"ml-2"}
              //   onClick={showDrawer}
              //   icon={<FilterOutlined />}
              // />
              drawer
            }
          </div>
        </div>
        <ConfigProvider locale={locale}>
          <Table
            rowSelection={rowSelection}
            bordered
            rowKey={record => record.id}
            columns={[...columns].filter(x => x.fixed || visibleColumns.includes(x.dataIndex))}
            style={{ overflowX: 'scroll' }}
            loading={loading}
            size={'small'}
            pagination={false}
            className='table-striped-rows'
            onChange={onTableChange}
            dataSource={data}
          />
        </ConfigProvider>
      </div>
    </div>
  );
}
