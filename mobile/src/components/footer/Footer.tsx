import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../css/FooterStyle';

export default function Footer() {
  return (
    <View style={styles.footer}>
      {/* قسم الشعار أو اسم التطبيق */}
      <View style={styles.logoSection}>
        <Text style={styles.footerLogoText}>مناسباتي 🇲🇦</Text>
      </View>

      {/* روابط سريعة */}
      <View style={styles.linksSection}>
        <TouchableOpacity>
          <Text style={styles.footerLink}>اتصل بنا</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerLink}>حجز موعد</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerLink}>الخدمات</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerLink}>المميزات</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerLink}>الرئيسية</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* حقوق النشر */}
      <Text style={styles.copyright}>
        جميع الحقوق محفوظة © 2026 مناسباتي
      </Text>
    </View>
  );
}