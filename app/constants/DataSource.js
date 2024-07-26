import Strings from './Strings';
import {Icons} from '../assets';

const SettingDataSource = [
  {
    tab: 'Setting',
    value: [
      {
        title: Strings.theme,
        value: [
          {type: 'checkbox', value: Strings.aqua},
          {type: 'checkbox', value: Strings.yellow},
          {type: 'checkbox', value: Strings.purple},
        ],
      },
      {
        title: Strings.alertAndNotification,
        value: [
          {
            section: Strings.alert,
            value: [
              {type: 'switch', value: Strings.warrantyExpiry},
              {type: 'switch', value: Strings.locationUpdate},
              {type: 'switch', value: Strings.productUpdate},
              {type: 'switch', value: Strings.deviceAuthentication},
              {type: 'switch', value: Strings.marketingAlert},
            ],
          },
          {
            section: Strings.pushNotification,
            value: [{type: 'switch', value: Strings.pushNotification}],
          },
        ],
      },
      {
        title: Strings.authentication,
        value: [
          {type: 'switch', value: Strings.faceId},
          {type: 'switch', value: Strings.passcode},
          {type: 'switch', value: Strings.fingerPrint},
        ],
      },
      {
        title: Strings.backupAndRestore,
        value: [
          {
            section: '',
            value: [
              {
                type: 'switch',
                value: Strings.backup,
              },
            ],
          },
          {
            section: 'Restore',
            value: [],
          },
        ],
      },
    ],
  },
  {
    tab: 'Product',
    value: [
      {
        productImage: Icons.logo,
        productTitle: 'Lenovo IdeaPad Slim 3, i5 14',
        productPurchase: 'May 2, 2021',
      },
      {
        productImage: Icons.logo,
        productTitle: 'Sony Bravia (65 inches) Ultra HD',
        productPurchase: 'June 20, 2021',
      },
      {
        productImage: Icons.logo,
        productTitle: 'Samsung 9khg Fully Automatic',
        productPurchase: 'Nov 20, 2020',
      },
    ],
  },
];

export default SettingDataSource;
