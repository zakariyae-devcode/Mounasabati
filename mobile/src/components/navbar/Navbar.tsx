import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../css/NavStyle';

export default function CustomNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View>
      {/* الشريط العلوي الأساسي */}
      <View style={styles.navbar}>
        {/* أجراءات الجهة اليمنى (زر القائمة وزر إنشاء حساب) */}
        <View style={styles.rightActions}>
          <TouchableOpacity 
            style={styles.menuBtn} 
            onPress={() => setMenuOpen(!menuOpen)}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupBtn}>
            <Text style={styles.signupText}>إنشاء حساب</Text>
          </TouchableOpacity>
        </View>

        {/* الشعار مع صورة البراد المغربي */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>مناسباتي</Text>
          <Image 
           source={require('../../../assets/logo/logo.png')} // تأكد من مسار الملف الصحيح حسب مجلدك
            style={styles.logoImage} 
            resizeMode="contain"
          />
        </View>
      </View>

      {/* القائمة المنسدلة تظهر عند الضغط على زر القائمة */}
      {menuOpen && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>الرئيسية</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>المميزات</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>الخدمات</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>حجز موعد</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>اتصل بنا</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}