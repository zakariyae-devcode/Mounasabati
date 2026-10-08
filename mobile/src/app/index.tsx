import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function HomeScreen() {
  const handlePress = () => {
    Alert.alert('مناسباتي', 'تم الضغط على الزر بنجاح!');
  };

  return (
    <View style={styles.container}>
      {/* عنوان التطبيق */}
      <Text style={styles.title}>مرحباً بك في مناسباتي 🇲🇦</Text>
      <Text style={styles.subtitle}>منصتك الأولى لإدارة وحجز المناسبات</Text>

      {/* زر تفاعلي */}
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>استعراض الخدمات</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 2, // إضافة ظل بسيط للأندرويد
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});