import * as Yup from 'yup';
import * as CpfCnpjValidator from '@eklesia/cpf-cnpj-validator';

Yup.setLocale({
  mixed: {
    default: 'O campo é inválido.',
    required: 'O campo é obrigatório',
    // eslint-disable-next-line
    oneOf: 'O campo deve ser um dos seguintes valores: ${values}',
    notOneOf:
      // eslint-disable-next-line
      'O campo não deve ser um dos seguintes valores: ${values}',
    notType: '',
  },
  string: {
    // eslint-disable-next-line
    length: 'O campo deve ter ${length} caracteres.',
    // eslint-disable-next-line
    min: 'Ol campo deve ter ${min} caracteres no mínimo.',
    // eslint-disable-next-line
    max: 'O campo deve ter ${max} caracteres no máximo.',
    matches: 'O campo no cumple con O formato establecido.',
    email: 'O campo deve ser um endereço de e-mail válido.',
    url: 'O campo deve ser um URL válido.',
    trim: 'O campo no deve ter espaços extras.',
    lowercase: 'O campo deve estar en minúscula.',
    uppercase: 'O campo deve estar en mayúscula.',
  },
  number: {
    // eslint-disable-next-line
    min: 'O campo deve ser maior ou igual que ${min}',
    // eslint-disable-next-line
    max: 'O campo deve ser menor ou igual que ${max}.',
    // eslint-disable-next-line
    lessThan: 'O campo deve ser menor que ${less}.',
    // eslint-disable-next-line
    moreThan: 'O campo deve ser mayot que ${more}.',
    // eslint-disable-next-line
    // notEqual: 'O campo no deve ser igual a ${notEqual}.',
    positive: 'O campo deve ser de valor positivo,',
    negative: 'O campo deve ser de valor negativo.',
    integer: 'O campo deve ser número inteiro.',
  },
  array: {
    // eslint-disable-next-line
    min: 'O campo deve ter no mínimo ${min} items',
    // eslint-disable-next-line
    max: 'O campo deve ter no máximo ${max} items',
  },
});

// New methods

Yup.addMethod(Yup.string, 'cnpjFormat', function () {
  const errorMessage = 'O numero CNPJ é inválido';

  return this.test('test-cnpj-format', errorMessage, async function (value) {
    const { path, createError } = this;

    return CpfCnpjValidator.cnpj.isValid(value, false) || createError({ path, message: errorMessage });
  });
});

Yup.addMethod(Yup.string, 'cpfFormat', function () {
  const errorMessage = 'O numero CPF é inválido';

  return this.test('test-cpf-format', errorMessage, async function (value) {
    const { path, createError } = this;

    return CpfCnpjValidator.cpf.isValid(value, true) || createError({ path, message: errorMessage });
  });
});

Yup.addMethod(Yup.number, 'lowerThanCurrentYear', function () {
  const errorMessage = 'O ano não pode ser maior do que o ano atual';

  const lowerThanCurrentYearValidator = (year: any) => {
    return year > new Date().getFullYear() ? false : true
  };

  return this.test('test-lower-than-current-year', errorMessage, async function(value) {
    const {path, createError} = this;
    
    return (
      lowerThanCurrentYearValidator(value) ||
      createError({ path, message: errorMessage})
    )

  });
});

export default Yup;
