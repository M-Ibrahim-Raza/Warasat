// src/utils/fonts.js
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

// Font loading hook
export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
          'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
          'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
          'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
          'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        // Fallback to system fonts if loading fails
        setFontsLoaded(true);
      }
    }

    loadFonts();
  }, []);

  return fontsLoaded;
};

// Font family helper
export const fontFamily = {
  montserratRegular: 'Montserrat-Regular',
  montserratMedium: 'Montserrat-Medium',
  montserratBold: 'Montserrat-Bold',
  poppinsRegular: 'Poppins-Regular',
  poppinsMedium: 'Poppins-Medium',
  poppinsBold: 'Poppins-Bold',
};