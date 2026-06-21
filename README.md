# 🌟 مناسباتي | Mounasabati

منصة رقمية متكاملة لإدارة وتنظيم المناسبات والفعاليات بسلاسة وكفاءة، تم بناؤها باستخدام تقنيات حديثة تضمن الأداء العالي والأمان.

## 🚀 المميزات الرئيسية

- **إدارة الفعاليات:** إنشاء وتعديل المناسبات مع تحديد التواريخ، الأوقات، والمواقع.
- **نظام الحضور:** تتبع المدعوين وإرسال الدعوات الرقمية وإدارة تأكيدات الحضور (RSVP).
- **لوحة تحكم ذكية:** واجهة مستخدم سلسة لإدارة كافة تفاصيل المناسبة وإحصائيات الحضور.
- **تصميم متجاوب:** متوافق تماماً مع جميع الشاشات (الهواتف الذكية، الأجهزة اللوحية، والحواسيب).

## 🛠️ البنية التقنية (Tech Stack)

- **الواجهة الخلفية (Backend):** Django / Django REST Framework
- **الواجهة الأمامية (Frontend):** Next.js (React) & Tailwind CSS
- **قاعدة البيانات (Database):** PostgreSQL

## 💻 التشغيل المحلي (Local Setup)

### 1. استنساخ المستودع (Clone the Repository)
```bash
git clone [https://github.com/zakariyae-devcode/Mounasabati.git](https://github.com/zakariyae-devcode/Mounasabati.git)
cd Mounasabati
# الانتقال إلى مجلد الخلفية (إن وجد)
cd backend

# إنشاء بيئة وهمية وتفعيلها
python -m venv venv
source venv/bin/activate  # على Linux/Mac
# venv\Scripts\activate  # على Windows

# تثبيت الاعتماديات
pip install -r requirements.txt

# إعداد قاعدة البيانات وتطبيق الهجرات (Migrations)
python manage.py migrate

# تشغيل خادم التطوير لـ Django
python manage.py runserver



# الانتقال إلى مجلد الأمامية (إن وجد)
cd ../frontend

# تثبيت الحزم
npm install

# تشغيل خادم التطوير لـ Next.js
npm run dev
