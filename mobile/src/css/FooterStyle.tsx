import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#1a102f',
    borderTopWidth: 1,
    borderTopColor: '#2d1b4e',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  footerLogoText: {
    color: '#f3e8ff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  linksSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 15,
  },
  footerLink: {
    color: '#e9d5ff',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#2d1b4e',
    marginVertical: 10,
  },
  copyright: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
  },
});