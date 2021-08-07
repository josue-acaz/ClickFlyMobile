import {format, parseISO} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import {brands, EnumCustomerTypes} from '../constants';

export function capitalize(str, lower = false) {
  return (lower ? str.toLowerCase() : str).replace(
    /(?:^|\s|["'([{])+\S/g,
    (match) => match.toUpperCase(),
  );
}

export function readableCpf(value) {
  let cpf = '';
  if (!value) {
    return cpf;
  }
  cpf = value.replace(/\D/g, '');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
}

export function rmDOB(value) {
  let dob = '';
  if (!value) {
    return dob;
  }
  dob = `${value.split('T')[0].split('-')[2]}/${
    value.split('T')[0].split('-')[1]
  }/${value.split('T')[0].split('-')[0]}`;
  return dob;
}

export function escapeCaracteres(value) {
  return value ? value.replace(/[^\d]+/g, '') : '';
}

export function maskPhone(value) {
  // Máscara Telefone
  function mtel(v) {
    v = v.toString().replace(/^(\d{2})(\d)/g, '($1)$2'); //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.toString().replace(/(\d)(\d{4})$/, '$1-$2'); //Coloca hífen entre o quarto e o quinto dígitos
    return v;
  }

  //Remove tudo o que não é dígito
  value = value.replace(/\D/g, '');
  return mtel(value);
}

export function maskCnpj(v) {
  //Remove tudo o que não é dígito
  v = v.replace(/\D/g, '');

  //Coloca ponto entre o segundo e o terceiro dígitos
  v = v.replace(/^(\d{2})(\d)/, '$1.$2');

  //Coloca ponto entre o quinto e o sexto dígitos
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');

  //Coloca uma barra entre o oitavo e o nono dígitos
  v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');

  //Coloca um hífen depois do bloco de quatro dígitos
  v = v.replace(/(\d{4})(\d)/, '$1-$2');

  return v;
}

export function maskCpf(value) {
  value = value.replace(/ /g, '');
  value = value.replace(/(\d{3})(\d)/g, '$1.$2');
  value = value.replace(/(\d{3})\.(\d{3})(\d)/g, '$1.$2-$3');
  value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})\.(\d{1})/g, '$1.$2.$3-$4');

  return value;
}

export function maskData(data) {
  data = data.replace(/\D/g, '');
  data = data.replace(/^(\d{2})(\d)/, '$1/$2');
  data = data.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');

  return data;
}

export function inCPF(cpf) {
  const value = cpf.split('.').join('').split('-').join('');
  return value;
}

export function inDOB(dob) {
  const value = `${dob.split('/')[2]}-${dob.split('/')[1]}-${
    dob.split('/')[0]
  }`;

  return value;
}

export function maskCardExpiry(expiry) {
  expiry = expiry.replace(/\D/g, '');
  expiry = expiry.replace(/^(\d{2})(\d)/, '$1/$2');

  return expiry;
}

export function maskCardNumber(number) {
  number = number.replace(/\D/g, '');
  number = number.replace(/^(\d{4})(\d)/, '$1 $2');
  number = number.replace(/(\d{4})\s(\d{4})(\d)/, '$1 $2 $3');
  number = number.replace(/(\d{4})\s(\d{4})\s(\d{4})(\d)/, '$1 $2 $3 $4');

  return number;
}

export function getCardBrand(cardnumber) {
  var cardnumber = cardnumber.replace(/[^0-9]+/g, '');
  var cards = {
    Visa: /^4[0-9]{12}(?:[0-9]{3})/,
    Mastercard: /^5[1-5][0-9]{14}/,
    Diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
    Amex: /^3[47][0-9]{13}/,
    Discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
    Hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
    Elo: /^((((636368)|(438935)|(504175)|(451416)|(636297)(506699)|(636369))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
    JCB: /^(?:2131|1800|35\d{3})\d{11}/,
    Aura: /^(5078\d{2})(\d{2})(\d{11})$/,
  };

  for (var flag in cards) {
    if (cards[flag].test(cardnumber)) {
      return flag;
    }
  }

  return false;
}

// encontra a bandeira adequada do cartão
export function findBrand(brand) {
  return brands.find((x) => x.label === brand);
}

export function maskCep(v) {
  //Remove tudo o que não é dígito
  v = v.replace(/\D/g, '');
  //Coloca ponto entre o segundo e o terceiro dígitos
  v = v.replace(/^(\d{5})(\d)/, '$1-$2');
  return v;
}

// Define o limite máximo de um texto e coloca reticências ao final dele
export function cutText(text = '', maxLength = 36) {
  let cut = text;
  if (text.length > maxLength) {
    const getPart = text.slice(0, maxLength - 1);
    cut = `${getPart.trim()}...`;
  }

  return cut;
}

export function getFormattedCustomerType(type) {
  return type.replace('-', '_');
}

export function getDatetime(date) {
  const datetime = parseISO(date);
  const formattedDatetime = format(datetime, "dd 'de' MMMM', às ' HH:mm", {
    locale: ptBR,
  });
  return formattedDatetime;
}

export function getDate(date) {
  const object = parseISO(date);
  const formattedDate = format(object, 'dd MMM', {locale: ptBR});
  return capitalize(formattedDate);
}

export function getTime(date) {
  const object = parseISO(date);
  return format(object, 'HH:mm', {locale: ptBR});
}

export function currency(value) {
  function normalizeNumber(number = 0.0) {
    let stringBuffer = number.toString();
    if (!stringBuffer.includes('.')) {
      number = Number(stringBuffer).toFixed(2);
    }

    return number;
  }

  var v = normalizeNumber(value).toString().replace(/\D/g, '');
  v = (v / 100).toFixed(2) + '';
  v = v.replace('.', ',');
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
  v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');

  return v;
}

export function getAerodromeName(aerodrome_name) {
  const name = aerodrome_name.split('/')[1]
    ? aerodrome_name.split('/')[1]
    : aerodrome_name;
  return capitalize(name, true);
}

export function calcSubtotal(price = 0.0, seats = 1) {
  return price * seats;
}

// retorna os dados do usuário + customer
export function mergeCustomer(customer) {
  const {user, customer_cards, customer_friends, customer_id} = customer;
  const data = {
    ...user,
    customer_cards,
    customer_friends,
    ...customer[customer.type.replace('-', '_')],
    type: customer.type,
    customer_id,
    id: customer.id,
  };

  return data;
}

export function objectValidation(object) {
  let isValid = true;
  if (!object) {
    isValid = false;
  } else {
    const arr = Object.keys(object);
    arr.forEach((key) => {
      if (!object[key]) {
        isValid = false;
      }
    });
  }

  return isValid;
}

// Verifica se é necessário prover informações adicionais
export function provideInformation(customer, paymentMethod) {
  let id = 1;
  let steps = [];
  let is_provide = false;
  const {type, cards, addresses} = customer;

  switch (type) {
    case EnumCustomerTypes.PF:
      is_provide = !customer.phone_number 
      || !customer.pf.rg 
      || !customer.pf.cpf 
      || !customer.pf.dob;

      break;
    case EnumCustomerTypes.PJ:
      is_provide = !customer.phone_number || !customer.pj.cnpj;
      break;
    default:
      break;
  }

  // Informações básica do cliente
  if (is_provide) {
    steps.push({
      id,
      route: "ProvideInformation",
    });

    id++;
  }

  // Meios de pagamento do cliente
  if (paymentMethod === "credit/debit" && cards.length === 0) {
    is_provide = true;
    steps.push({
      id,
      route: "AddPay",
    });

    id++;
  }

  // Endereço do cliente
  if (paymentMethod === "boleto" && addresses.length === 0) {
    is_provide = true;
    steps.push({
      id,
      route: "Address",
    });

    id++;
  }

  return ({is_provide, steps});
}

// Valida as entradas dinamicas em formulários (Provide Informations)
export function dynamicValidation(target, inputs, exclude = []) {
  let isValid = true;
  const arr = Object.keys(inputs);
  arr.forEach((key) => {
    const value = inputs[key];
    if (
      !target[key] &&
      !exclude.find(function (exc) {
        return exc === key;
      })
    ) {
      if (!value) {
        isValid = false;
      }
    }
  });

  return isValid;
}

export function removeFromArray(array = [], index = 0) {
  return array.splice(index, 1);
}

export function getExpirationDate(exp_month, exp_year) {
  return `${
    exp_month.toString().length === 1 ? '0' + exp_month.toString() : exp_month
  }/${exp_year.toString().split('0')[1]}`;
}

export function maskBarCode(number) {
  let barcode = '';
  if (!number) {
    return barcode;
  }
  barcode = number.replace(/\D/g, '');
  return barcode.replace(
    /(\d{5})(\d{5})(\d{5})(\d{6})(\d{5})(\d{6})(\d{1})(\d{14})/g,
    '$1.$2 $3.$4 $5.$6 $7 $8',
  );
}

export function getCityUF(aerodrome) {
  const {name, uf} = aerodrome.city;
  return `${name} • ${uf.prefix}`;
}

export function getExtFile(uri) {
  return uri.split('.')[1];
}

export function getRandomString(length = 5) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function formatShortDate(date) {
  const datetime = parseISO(date);
  const formatted = format(datetime, 'dd MMM', {
    locale: ptBR,
  });

  return formatted.toUpperCase();
}

export function getFormattedDatetime(date, date_format_type) {
  const formatted = format(date, date_format_type, {locale: ptBR});
  return formatted;
}