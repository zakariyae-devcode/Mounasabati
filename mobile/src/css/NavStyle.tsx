import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  navbar: {
    height: 70,
    backgroundColor: '#1a102f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2d1b4e',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  logo: {
    color: '#f3e8ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  signupBtn: {
    backgroundColor: '#eab308',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  signupText: {
    color: '#1a102f',
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuBtn: {
    padding: 8,
  },
  menuIcon: {
    color: '#f3e8ff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  // تصميم القائمة المنسدلة التي تظهر عند الضغط على زر القائمة
  dropdownMenu: {
    backgroundColor: '#1a102f',
    borderBottomWidth: 1,
    borderBottomColor: '#2d1b4e',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dropdownItem: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#2d1b4e',
  },
  dropdownText: {
    color: '#e9d5ff',
    fontSize: 20,
    fontFamily: 'Cairo-Regular',
    textAlign: 'right',
    fontWeight: '500',
  },
});