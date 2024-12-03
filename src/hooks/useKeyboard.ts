import { useState, useEffect } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const onKeyboardShow = (event: KeyboardEvent) => {
      setIsKeyboardVisible(true);
      setKeyboardHeight(event.endCoordinates.height);
    };

    const onKeyboardHide = () => {
      setIsKeyboardVisible(false);
      setKeyboardHeight(0);
    };

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return { height: keyboardHeight, isOpen: isKeyboardVisible };
};

export default useKeyboard;
