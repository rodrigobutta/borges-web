import React, { useState } from 'react';
import { Tag, Row, Col, Input } from 'antd';
// import { useAxios } from '../hooks/useAxiosV2';

// const { Option } = Select;

interface UserFiltersProps {
  filters: any[];
  onRemove?: any;
  onSearchTextAdded?: any;
  onFiltersChange?: any;
}

export default function UserFilters({
  filters = [],
  onRemove = null,
  onSearchTextAdded = null,
  onFiltersChange = null,
}: UserFiltersProps) {
  const [searchText, setSearchText] = useState('');
  // const {axios} = useAxios({ apiVersion: 2 });

  // const [accounts, setAccounts] = useState([]);
  // const [accountSelected, setAccountSelected] = useState();

  // useEffect(() => {
  // 	async function fetchData() {
  // 		!!axios &&
  // 			axios.get(`account`).then((res) => {
  // 				setAccounts(res.data.rows);
  // 			});
  // 	}
  // 	fetchData();
  // }, [axios]);

  // function onAccountSelectChange(_value, option) {
  // 	setAccountSelected(null);
  // 	addFilter('Cuenta', 'accountId', option.value, option.label);
  // }

  const handleFilterRemove = (filterToRemove: any) => {
    const remainingFilters = filters.filter(
      (f: any) => f.name !== filterToRemove.name || f.value !== filterToRemove.value,
    );

    updateFilters(remainingFilters);

    onRemove && typeof onRemove === 'function' && onRemove(filterToRemove, remainingFilters);
  };

  const updateFilters = (updatedFilters: any) => {
    onFiltersChange && typeof onFiltersChange === 'function' && onFiltersChange(updatedFilters);
  };

  const handleSearchTextAdd = () => {
    addFilter('Texto', 'search', searchText, searchText);

    onSearchTextAdded && typeof onSearchTextAdded === 'function' && onSearchTextAdded(searchText);

    setSearchText('');
  };

  const addFilter = (label: string, name: string, value: any, text = '') => {
    const addedFilters = [
      ...filters,
      {
        label,
        name,
        text,
        value,
      },
    ];

    updateFilters(addedFilters);
  };

  return (
    <>
      <Row style={{ marginBottom: 4 }}>
        <Col span={24}>
          <Input
            allowClear
            placeholder='Nome, sobrenome, email o ID'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSearchTextAdd()}
          />
        </Col>
        {/* <Col span={8}>
					<Select
						style={{ width: '100%' }}
						showSearch
						placeholder="Cuenta o perfil"
						optionFilterProp="children"
						onChange={onAccountSelectChange}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
						optionLabelProp="name"
						value={accountSelected}
					>
						{accounts.map((a, ix) => (
							<Option key={ix} value={a.id} account={a} label={a.name}>
								{a.name}
							</Option>
						))}
					</Select>
				</Col> */}
      </Row>
      <Row style={{ marginBottom: 4 }}>
        <Col span={24}>
          {filters.map((filter, ix) => (
            <Tag
              key={`${filter.name}_${filter.value}`}
              style={{ cursor: 'pointer' }}
              onClose={() => handleFilterRemove(filter)}
              closable
            >
              <strong>{filter.label}:</strong> {filter.text}
            </Tag>
          ))}
        </Col>
      </Row>
    </>
  );
}
