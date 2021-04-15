import amex from '../assets/amex.png';
import visa from '../assets/visa.png';
import diners from '../assets/diners.png';
import jcb from '../assets/jcb.png';
import master from '../assets/mastercard.png';
import discover from '../assets/discover.png';
import hipercard from '../assets/hipercard.png';
import aura from '../assets/aura.png';
import elo from '../assets/elo.png';

const EnumCustomerTypes = Object.freeze({
  PF: "pf",
  PJ: "pj",
});

const EnumPaymentMethods = Object.freeze({
  CREDIT_CARD: "credit_card",
  DEBIT_CARD: "debit_card",
  BOLETO: "boleto",
  PIX: "pix",
});

const brands = [
  {
    label: 'Visa',
    img: visa,
  },
  {
    label: 'Mastercard',
    img: master,
  },
  {
    label: 'Amex',
    img: amex,
  },
  {
    label: 'Diners',
    img: diners,
  },
  {
    label: 'JCB',
    img: jcb,
  },
  {
    label: 'Discover',
    img: discover,
  },
  {
    label: 'Hipercard',
    img: hipercard,
  },
  {
    label: 'Elo',
    img: elo,
  },
  {
    label: 'Aura',
    img: aura,
  },
];

const mapstyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
];

const EnumDateFormatTypes = Object.freeze({
  SQL: "yyyy'-'MM'-'dd", // 2021-08-14
  READABLE_V1: "dd 'de' MMMM 'de' yyyy", // 14 de Agosto de 2021
  READABLE_V2: "dd'/'MM'/'yyyy",
});

export {
  brands, 
  mapstyle,
  EnumCustomerTypes,
  EnumPaymentMethods,
  EnumDateFormatTypes
};
