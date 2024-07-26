import Strings from './Strings';
const EditAccountData = [
  {
    label: 'fullName',
    fieldTitle: Strings.firstNameLastName,
    keyboardType: 'default',
    isEditableButton: false,
  },
  {
    label: 'mobile',
    fieldTitle: Strings.mobile,
    keyboardType: 'phone-pad',
    isEditableButton: false,
    maxLength: 14,
  },
  {
    label: 'emailAddress',
    fieldTitle: Strings.emailAddress,
    keyboardType: 'email-address',
    isEditableButton: false,
  },
];
export default EditAccountData;
