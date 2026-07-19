import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/headers';

import Footer from './components/footer';

import FloatingChatWidget from './components/Chat/FloatingChatWidget';
export const metadata = {
  title: 'منصة مناسباتي',
  description: 'النظام المغربي الحديث لإدارة وحجز المناسبات والمواعيد',
};

import "bootstrap/dist/css/bootstrap.min.css"; // تأكد من استدعاء البوتستراب

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className="d-flex flex-column min-vh-100">
        <Header/>
        
        <main className="flex-grow-1">
          {children}
          <FloatingChatWidget/>
        </main>
        <Footer/>
        
      
      </body>
    </html>
  );
}