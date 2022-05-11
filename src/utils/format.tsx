import React from 'react';
import { Link } from 'react-router-dom';
import { formatNumber as accountingFormatNumber } from 'accounting';
import { FIELD_TYPES } from '../constants/index';
import { DateTime } from 'luxon';
import moment from 'moment';

const jobTypes: any = {
  1: 'Asalariado Privado',
  2: 'Jubilado o Pensionista',
  3: 'Trabajador Independiente',
  4: 'Profesional Independiente',
  5: 'Trabajador Informal Independiente',
};

export const formatMoney = (pValue: string | number | undefined | null, decimals = 0, currencySymbol = 'R$ ') => {
  if (!pValue) {
    return '';
  }

  const value = typeof pValue === 'string' ? pValue : String(pValue);

  return value !== ''
    ? `${currencySymbol} ` + accountingFormatNumber(parseFloat(value), decimals, '.', ',')
    : `${currencySymbol} 0`;
};

export function formatNumberInput(n: string) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatCPF(number: any) {
  if (typeof number === 'string') {
    const num = number.substr(0, 9);
    const num2 = number.substr(9, 2);

    return `${formatNumberInput(num)}${num2.length > 0 ? `-${num2}` : ''}`;
  }
  return '-';
}

export function formatPhone(number: any) {
  if (typeof number === 'string') {
    const num = number.substr(0, 2);
    const num2 = number.substr(2, 2);
    const num3 = number.substr(4, 5);
    const num4 = number.substr(9, 4);

    const character1 = `${num.length > 0 ? `+${num}` : ''}`;
    const character2 = `${num2.length > 0 ? `(${num2})` : ''}`;
    const character3 = `${num3.length > 0 ? `${num3}` : ''}`;
    const character4 = `${num4.length > 0 ? `-${num4}` : ''}`;

    return `${character1} ${character2} ${character3}${character4}`;
  }
  return '-';
}

export const formatNumber = (value: any, decimals: number = 2) =>
  value !== '' ? accountingFormatNumber(value, decimals, '.', ',') : '';

export const getFormattedDate = (date: any) =>
  moment(date).isValid() ? moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY') : '';

export const formatPercentage = (value: any, multiply100?: boolean) =>
  accountingFormatNumber(multiply100 ? value * 100 : value, 2, '.', ',') + '%';

export const getAge = (birthDate: any) =>
  moment(birthDate).isValid() && birthDate !== undefined ? moment().diff(moment(birthDate), 'years') : '';

export const format = (value: any, type: string, options?: any) => {
  switch (type) {
    case FIELD_TYPES.CHECKBOX:
      return value ? 'SIM' : 'NO';

    case FIELD_TYPES.CURRENCY:
      return options && options.currency && options.currency === 'USD'
        ? formatMoney(value, 0, 'U$D')
        : formatMoney(value, 0, 'R$');

    case FIELD_TYPES.JSON:
      return JSON.stringify(value, null, 2);

    case FIELD_TYPES.RELATIVE_TIME:
      return DateTime.fromISO(value).toRelative({ locale: 'pt' });

    case FIELD_TYPES.PERCENTAGE:
      return formatPercentage(value, options?.multiply100);

    case FIELD_TYPES.DATE:
      return value ? DateTime.fromSQL(value.replace('T', ' ')).toFormat('dd/MM/yyyy') : '';
    case FIELD_TYPES.DATE_TIME:
      return value ? DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_FULL) : '';
    case FIELD_TYPES.DATE_TIME_MED:
      return value ? DateTime.fromISO(value).toFormat('ff') : '';

    case FIELD_TYPES.INTEGER:
      return value ? formatNumber(value, 0) : '0';
    case 'link':
      return <Link to={`/${options.route}/${value}`}>{value}</Link>;

    case 'phone':
      return value ? formatPhone(value) : '0';

    case 'jobType':
      return value ? jobTypes[value] : '-';

    default:
      return value || value === 0 ? value : '-';
  }
};

export default format;
