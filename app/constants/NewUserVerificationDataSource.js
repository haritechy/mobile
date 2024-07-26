import Strings from './Strings';

const NewUserVerificationDataSource = [
  {
    id: 0,
    type: 'radio',
    value: Strings.resendViaEmail,
    isChecked: false,
    desc: Strings.resendViaEmailDesc,
  },
  {
    id: 1,
    type: 'radio',
    value: Strings.resendViaSms,
    isChecked: false,
    desc: Strings.resendViaSmsDesc,
  },
];
export default NewUserVerificationDataSource;
