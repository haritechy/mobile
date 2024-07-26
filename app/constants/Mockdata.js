import {Strings} from '.';
import {Icons, Images} from '../assets';

const PropertyType = {
  Residential: 'Residential',
  Business: 'Business',
};

const homeScreenMockData = {
  warrantyCoverage: {
    warrantyCoveragePercentage: 50,
    warrantyNotCoverPercentage: 100,
  },
  productByCategoriesPieChart: {
    type: 'pie',
    data: {
      labels: ['Electronics', 'Appliances', 'Mobiles', 'Interiors'],
      datasets: [
        {
          label: null,
          backgroundColor: [
            '#0074D9',
            '#FF4136',
            '#2ECC40',
            '#FF851B',
            '#7FDBFF',
            '#B10DC9',
            '#FFDC00',
            '#001f3f',
            '#39CCCC',
            '#01FF70',
            '#85144b',
            '#F012BE',
            '#3D9970',
            '#111111',
            '#AAAAAA',
          ],
          data: [25, 18, 21, 26],
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      tooltips: {
        enabled: true,
      },
      scales: null,
      layout: {
        padding: {
          bottom: 10,
          left: 10,
          right: 10,
          top: 20,
        },
      },
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            color: '#808080',
            fonts: {
              size: 20,
            },
          },
          position: 'bottom',
        },
      },
      indexAxis: null,
      maintainAspectRatio: false,
    },
  },
  productByLocationsPieChart: {
    type: 'pie',
    data: {
      labels: ['aazzzzffff1111….', 'rewerew', 'Ahmedabad1', 'Mumbai'],
      datasets: [
        {
          label: null,
          backgroundColor: [
            '#0074D9',
            '#FF4136',
            '#2ECC40',
            '#FF851B',
            '#7FDBFF',
            '#B10DC9',
            '#FFDC00',
            '#001f3f',
            '#39CCCC',
            '#01FF70',
            '#85144b',
            '#F012BE',
            '#3D9970',
            '#111111',
            '#AAAAAA',
          ],
          data: [14, 26, 44, 5],
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      tooltips: {
        enabled: true,
      },
      scales: null,
      layout: {
        padding: {
          bottom: 10,
          left: 10,
          right: 10,
          top: 20,
        },
      },
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            color: '#808080',
            fonts: {
              size: 20,
            },
          },
          position: 'bottom',
        },
      },
      indexAxis: null,
      maintainAspectRatio: false,
    },
  },
  assetValuesPerYearBarChart: {
    type: 'bar',
    data: {
      labels: ['2022', '2021'],
      datasets: [
        {
          label: null,
          backgroundColor: ['#009688', '#009688'],
          data: [
            {x: '2022', y: 5.5},
            {x: '2021', y: 3.5},
            {x: '2020', y: 3.3},
            {x: '2019', y: 4.9},
          ],
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      tooltips: {
        enabled: true,
      },
      scales: {
        x: {
          stacked: false,
          ticks: {
            beginAtZero: true,
            color: '#808080',
            min: 0,
            stepSize: 10000,
            fonts: null,
          },
        },
        y: {
          stacked: false,
          ticks: {
            beginAtZero: true,
            color: '#808080',
            min: 0,
            stepSize: 10000,
            fonts: null,
          },
        },
      },
      layout: {
        padding: {
          bottom: 10,
          left: 10,
          right: 10,
          top: 20,
        },
      },
      plugins: {
        legend: null,
      },
      indexAxis: null,
      maintainAspectRatio: false,
    },
  },
};
const listMoreOption = [
  {
    id: 1,
    name: 'Edit details',
    icon: Icons.editSquare,
  },
  {
    id: 2,
    name: 'Delete',
    icon: Icons.trash,
  },
];

const locationMoreOption = [
  {
    id: 1,
    name: 'Delete Items',
    icon: Icons.checkCircle,
    type: 'delete',
  },
];

const receiptMoreOption = [
  {
    id: 1,
    name: 'Edit',
    icon: Icons.editSquare,
    type: 'edit',
  },
  {
    id: 2,
    name: 'Delete',
    icon: Icons.checkCircle,
    type: 'delete',
  },
];

const productMoreOption = [
  {
    id: 1,
    name: 'Move Items',
    icon: Icons.checkCircle,
    type: 'move',
  },
  {
    id: 2,
    name: 'Delete Items',
    icon: Icons.checkCircle,
    type: 'delete',
  },
];

const listPropertyType = [
  {
    id: 1,
    type: 'Residential',
    icon: Icons.houseHeart,
  },
  {
    id: 2,
    type: 'Business',
    icon: Icons.building,
  },
];
const listCurrency = [
  {
    id: 1,
    value: 'INR',
  },
  {
    id: 2,
    value: 'USD',
  },
];

const listWarrantyStatus = [
  {
    id: 1,
    value: 'Active',
  },
  {
    id: 2,
    value: 'Expired',
  },
];

const deletePopupData = {
  description:
    'You are about to delete Amazon Office from your locations. This location has 8 devices/products associated with it. \n\nIf you proceed, all the location information including it is devices will be purged and cannot be recovered',
  termsText: 'I accept to delete the associated products.',
};
const invalidPhoneEmailData = {
  description: 'Please enter a valid email or phone to  reset your',
};

const verifiedData = {
  description:
    'Your email verification is completed.\nThank you for completing your sign up,\nand welcome to Melbeez!',
};
const reminderData = {
  description:
    'Your mobile/Email verification is pending \nTo send the verification link on email/phone',
  reminderVerifiedDescription:
    'Your email/phone verification is completed \nThank you for completing the \nverification process',
};
const privacyDescription = {
  description:
    'You can enable this, If you do not wish us to share \nyour information with 3rd parties to help improve \nand provide better service.',
};

const privacyPreference = {
  allowMarketing: 'I authorise Melbeez to send me Marketing communications',
  allowThirdParty:
    'By signing up I understand that my information could be made available to third party service providers and organizations to provide personalized services.',
  allowBiometrics:
    'By signing up I agree to the use of my biometric information for facilitating faster login. I understand that my biometric information (if used) will be only used for signing in the session and is not transmitted to nor stored by Melbeez',
};

const listWalkThrough = [
  {
    image: Images.logoScreen1,
    title: 'Add Location',
    description:
      'Browse through enthusiasts and add the right location for you.',
  },
  {
    image: Images.logoScreen2,
    title: 'Inventory stored',
    description:
      'Browse through enthusiasts and find the right matches for you.',
  },
  {
    image: Images.logoScreen3,
    title: 'Notifications',
    description: 'Get your notifications before the expiry of warranty.',
  },
];

const listProductSortBy = [
  {
    id: 1,
    type: Strings.name,
  },
  {
    id: 2,
    type: `${Strings.recentlyAdded}`,
  },
  {
    id: 3,
    type: `${Strings.purchased}: ${Strings.mostRecentFirst}`,
  },
  {
    id: 4,
    type: `${Strings.purchased}: ${Strings.oldestFirst}`,
  },
];

const listReceiptSortBy = [
  {
    id: 1,
    type: `${Strings.recentlyAdded}`,
  },
  {
    id: 2,
    type: `${Strings.purchased}: ${Strings.mostRecentFirst}`,
  },
  {
    id: 3,
    type: `${Strings.purchased}: ${Strings.oldestFirst}`,
  },
];

const listLocationSort = [
  {
    id: 1,
    type: Strings.name,
  },
  {
    id: 2,
    type: Strings.lastUpdated,
  },
];
const profileAddresses = [
  {
    id: '0',
    type: 'Physical Address',
    address:
      '2054 Sunburst Drive, Oakland, Fort Myers,\nFlorida(FL), 33901,\nUnited States',
  },
  {
    id: '1',
    type: 'Mailing Address',
    address:
      '3122 Hiddenview Drive, Tullytown,\nPennsylvania(PA), 19007,\nUnited States',
  },
];

const listCountryCodes = [
  {
    name: 'India',
    countryCode: 91,
    isoCode: 'IN',
    flag: Icons.flagIndia,
  },
  {
    name: 'United States',
    countryCode: 1,
    isoCode: 'US',
    flag: Icons.flagUsa,
  },
];

export {
  homeScreenMockData,
  listCurrency,
  listPropertyType,
  PropertyType,
  listMoreOption,
  deletePopupData,
  locationMoreOption,
  receiptMoreOption,
  productMoreOption,
  invalidPhoneEmailData,
  verifiedData,
  listWalkThrough,
  listProductSortBy,
  listLocationSort,
  privacyDescription,
  profileAddresses,
  listCountryCodes,
  listReceiptSortBy,
  listWarrantyStatus,
  reminderData,
  privacyPreference,
};
