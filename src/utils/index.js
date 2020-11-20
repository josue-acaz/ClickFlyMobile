import {brands} from '../constants';

export function rmCPF(value) {
  const cpf = value.replace(/\D/g, '');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
}

export function rmDOB(value) {
  const dob = `${value.split('T')[0].split('-')[2]}/${
    value.split('T')[0].split('-')[1]
  }/${value.split('T')[0].split('-')[0]}`;
  return dob;
}

export function rmEspecialCaracteres(value) {
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
