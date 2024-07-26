import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

const useSignUp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [imageSource, setImageSource] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVerification, selectVerification] = useState('email');
  const [isTerms, setIsTerms] = useState(false);

  const signUpUser = values => {
    console.log('VALUES OF REGISTRATION is', values);
  };
  const navigateBack = () => {
    navigation.goBack();
  };

  return {
    signUpUser,
    navigateBack,
    modalVisible,
    setModalVisible,
    selectedVerification,
    selectVerification,
    isTerms,
    setIsTerms,
  };
};
export default useSignUp;
