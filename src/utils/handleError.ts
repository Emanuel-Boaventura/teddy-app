import { Alert } from 'react-native';

export function handleError(error: any, title = 'Erro') {
  function showAlert(errorMsg: string) {
    Alert.alert(title, errorMsg, [{ text: 'OK' }]);
  }

  if (typeof error === 'string') {
    return showAlert(error);
  }

  if (error?.message) {
    return showAlert(error.message);
  }

  showAlert('Ocorreu um erro inesperado');
}
