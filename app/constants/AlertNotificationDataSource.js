import Strings from './Strings';

const AlertNotificationDataSource = [
  {
    title: Strings.alerts,
    data: [
      {
        id: 1,
        subTitle: Strings.warrantyExpiry,
      },
      {
        id: 2,
        subTitle: Strings.locationUpdate,
      },
      {
        id: 3,
        subTitle: Strings.productUpdate,
      },
      //TODO In Next Phase
      // {
      //   id: 4,
      //   subTitle: Strings.deviceActivation,
      // },
      // {
      //   id: 5,
      //   subTitle: Strings.marketingAlert,
      // },
    ],
  },
  {
    title: Strings.notifications,
    data: [
      {
        id: 1,
        subTitle: Strings.pushNotification,
      },
      //TODO In Next Phase
      // {
      //   id: 2,
      //   subTitle: Strings.emailNotification,
      // },
      // {
      //   id: 3,
      //   subTitle: Strings.textNotification,
      // },
    ],
  },
];

export default AlertNotificationDataSource;
