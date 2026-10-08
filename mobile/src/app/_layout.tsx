import React from 'react';
import { StyleSheet, View,ScrollView } from 'react-native';
import { Slot } from 'expo-router';
import CustomNavbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      {/* الشريط العلوي الثابت */}
      <CustomNavbar />

      {/* محتوى الشاشات مع إمكانية التمرير لكي يظهر الـ Footer بأسفل الصفحة */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        <Slot />
      </ScrollView>

      {/* تذييل الصفحة (Footer) */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a102f', // لون الخلفية الداكن الموحد
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});