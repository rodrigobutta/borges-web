import { formatNumber } from 'accounting';
import { FIELD_TYPES } from '../constants/index';
import { cpf } from '@eklesia/cpf-cnpj-validator';

import _ from 'lodash';

export const validateDate = (dateString: any) => {
  let regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false;
  let d = new Date(dateString);
  let dNum = d.getTime();
  if (!dNum && dNum !== 0) return false;
  return d.toISOString().slice(0, 10) === dateString;
};

export const validateInteger = (number: any) => Number.isInteger(Number(number));

export const validateEmail = (string: any) => /\S+@\S+\.\S+/.test(string);

export const validateText = (string: any) => /^[ÁáÉéÍíÓóÚúÑñA-Za-z _]*[ÁáÉéÍíÓóÚúÑñA-Za-z][ñA-Za-z _]*$/.test(string);

const getRequiredFields = (fields: any) => fields.filter((x: any) => x.required);

const getEmailFields = (fields: any) => fields.filter((x: any) => x.type === FIELD_TYPES.EMAIL);

const getDateFields = (fields: any) => fields.filter((x: any) => x.type === FIELD_TYPES.DATE);

const getPhoneFields = (fields: any) => fields.filter((x: any) => x.type === FIELD_TYPES.PHONE);

const getCitizenNumberFields = (fields: any) => fields.filter((x: any) => x.type === FIELD_TYPES.CITIZEN_NUMBER);

const getNumberFields = (fields: any) =>
  fields.filter((x: any) => x.required && (x.type === 'number' || x.type === 'currency'));

const getIntegerFields = (fields: any) => fields.filter((x: any) => x.type === FIELD_TYPES.INTEGER);

const getTextFields = (fields: any) =>
  fields.filter((x: any) => x.type === undefined || x.type === 'text' || x.type === 'password');

const format = (value: any) => formatNumber(value, 0, '.');

const validation_digit = (ci: any) => {
  var a = 0;
  var i = 0;
  if (ci.length <= 6) {
    for (i = ci.length; i < 7; i++) {
      ci = '0' + ci;
    }
  }
  for (i = 0; i < 7; i++) {
    a += (parseInt('2987634'[i]) * parseInt(ci[i])) % 10;
  }
  if (a % 10 === 0) {
    return 0;
  } else {
    return 10 - (a % 10);
  }
};

const validate_ci = (ci: any) => {
  ci = clean_ci(ci);
  var dig = ci[ci.length - 1];
  ci = ci.replace(/[0-9]$/, '');
  return dig === validation_digit(ci);
};

// const random_ci = () => {
//   var ci = Math.floor(Math.random() * 10000000).toString();
//   ci = ci.substring(0, 7) + validation_digit(ci);
//   return ci;
// };

const clean_ci = (ci: any) => {
  return ci.replace(/\D/g, '');
};

let validator = (entity: any, fields: any, locale: string = 'BR') => {
  let errors: any = {};

  getRequiredFields(fields).forEach((field: any) => {
    if (_.isNil(entity[field.name]) || entity[field.name] === '') {
      errors[field.name] = field.error || 'Este campo é obrigatório';
    }
  });

  getEmailFields(fields).forEach((field: any) => {
    if (entity[field.name] && !validateEmail(entity[field.name])) {
      errors[field.name] = 'Formato Errado';
    }
  });

  getPhoneFields(fields).forEach((field: any) => {
    if (entity[field.name]) {
      if (entity[field.name].length < 12 || entity[field.name].length > 14) {
        errors[field.name] = 'O numero é inválido';
      }
    }
  });

  getCitizenNumberFields(fields).forEach((field: any) => {
    if (entity[field.name]) {
      switch (locale) {
        case 'BR':
          if (entity[field.name] && !cpf.isValid(entity[field.name], true)) {
            errors[field.name] = 'O numero cpf é inválido';
          }
          break;
        case 'UY':
          if (entity[field.name].length < 7) {
            errors[field.name] = 'La cédula de identidad tiene al menos 7 dígitos';
          } else if (!validate_ci(entity[field.name])) {
            errors[field.name] = 'La cédula de identidad es inválida';
          }
          break;
      }
    }
  });

  getIntegerFields(fields).forEach((field: any) => {
    if (entity[field.name] && !validateInteger(entity[field.name])) {
      errors[field.name] = 'O valor tem que ser um inteiro';
    }
  });

  getNumberFields(fields).forEach((field: any) => {
    if (field.max && entity[field.name] > field.max) {
      errors[field.name] = `Valor máximo ${format(field.max)}`;
    } else if (field.min && entity[field.name] < field.min) {
      errors[field.name] = `Valor mínimo ${format(field.min)}`;
    } else if (entity[field.name] === '') {
      errors[field.name] = field.error || 'Este campo é obrigatório';
    }
  });

  getDateFields(fields).forEach((field: any) => {
    if (entity[field.name] && !validateDate(entity[field.name])) {
      errors[field.name] = 'Formato Errado';
    }
  });

  getTextFields(fields).forEach((field: any) => {
    if (entity[field.name]) {
      if (field.letterOnly && !validateText(entity[field.name])) {
        errors[field.name] = 'Só são permitidas letras';
      } else if (field.max && entity[field.name].length > field.max) {
        errors[field.name] = `Máximo ${field.max.toString()} caracteres`;
      } else if (field.min && entity[field.name].length < field.min) {
        errors[field.name] = `Mínimo ${field.min.toString()} caracteres`;
      } else if (field.noSpaces && entity[field.name].indexOf(' ') > 0) {
        errors[field.name] = 'Não são permitidos espaços';
      }
    }
  });

  return errors;
};
export default validator;
