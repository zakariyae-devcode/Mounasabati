'use client'
import React from 'react';

export default function ServicesSection() {
  const services = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#d4af37" className="bi bi-gem mb-3" viewBox="0 0 16 16">
          <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.97 3.96a.5.5 0 0 1-.3.79l-7.97 4.98a.5.5 0 0 1-.5 0L.13 5.25a.5.5 0 0 1-.3-.79L3.1.7zm1.35 1.155L2.33 4.5h11.34L11.55 1.855H4.45zM1 5.5l7 8.5 7-8.5H1z"/>
        </svg>
      ),
      title: 'أعراس وتنسيق ديكورات أسطورية',
      description: 'تصميم وبناء ديكورات قاعات الأفراح بلمسات أندلسية ساحرة، كوشات ملكية، وتنسيق إضاءة يبعث الدفء والجمال في قاعة الحفل.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#d4af37" className="bi bi-cup-hot mb-3" viewBox="0 0 16 16">
          <path d="M3 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1zm1.5 3a.5.5 0 0 0-.5.5v7a1.5 1.5 0 0 0 1.5 1.5h4a1.5 1.5 0 0 0 1.5-1.5V6a.5.5 0 0 0-.5-.5h-6zM2 5.5A1.5 1.5 0 0 1 3.4 4h7.2A1.5 1.5 0 0 1 12 5.5v7a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5.5z"/>
        </svg>
      ),
      title: 'الضيافة والتموين المغربي الفاخر',
      description: 'أفخر المأكولات والمشروبات التقليدية كالمشوي المغربي، الطاجين العريق، البسطيلة والحلويات الفاخرة، مع طقوس تقديم الشاي الملكي المميزة.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#d4af37" className="bi bi-stars mb-3" viewBox="0 0 16 16">
          <path d="M7.657 6.247c.11-.33.576-.33.686 0l.545 1.637a.333.333 0 0 0 .316.228h1.721c.347 0 .492.446.212.65l-1.392 1.012a.333.333 0 0 0-.121.372l.545 1.637c.11.33-.268.605-.548.401L8 11.127a.333.333 0 0 0-.391 0l-1.392 1.012c-.28.204-.658-.07-.548-.401l.545-1.637a.333.333 0 0 0-.121-.372L4.698 8.763c-.28-.204-.135-.65.212-.65h1.721a.333.333 0 0 0 .316-.228l.545-1.637z"/>
        </svg>
      ),
      title: 'النكافة والبرزة المغربية العريقة',
      description: 'مرافقة العروس بأحدث تشكيلات القفاطين والتكاشط الفخمة، مع تنسيق زفة العمارية والبرزة وسط حضور من المحترفين ليوم لا يُنسى.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#d4af37" className="bi bi-camera-reels mb-3" viewBox="0 0 16 16">
          <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-5 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM1.5 7.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1H2a.5.5 0 0 1-.5-.5zM2 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm10 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
        </svg>
      ),
      title: 'التصوير والتوثيق السينمائي',
      description: 'تخليد لحظاتكم الثمينة بعدسات طاقم تصوير سينمائي محترف، لتسجيل وتوثيق أدق ملامح الفرح والمشاعر بنقاء وجودة لا تضاهى.'
    }
  ];

  return (
    <>
      <style>{`
        .andalusian-font {
          font-family: 'Amiri', 'Andalus', serif !important;
        }
        .text-gold {
          color: #d4af37 !important;
        }
        .bg-luxury-purple {
          background-color: #1a0933 !important; /* لون البنفسجي الملكي */
        }
        .service-card {
          background-color: rgba(30, 11, 54, 0.6);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 15px;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          overflow: hidden;
        }
        .service-card:hover {
          transform: translateY(-10px);
          border-color: #d4af37;
          box-shadow: 0 15px 30px rgba(212, 175, 55, 0.15);
          background-color: rgba(30, 11, 54, 0.95);
        }
        .service-card .icon-wrapper {
          background-color: rgba(212, 175, 55, 0.05);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px auto;
          border: 1px solid rgba(212, 175, 55, 0.1);
          transition: all 0.3s ease;
        }
        .service-card:hover .icon-wrapper {
          background-color: rgba(212, 175, 55, 0.15);
          border-color: #d4af37;
          transform: rotateY(180deg);
        }
      `}</style>

      <section dir="rtl" className="bg-luxury-purple py-5 position-relative overflow-hidden">
        {/* خطوط خلفية فنية ناعمة */}
        <div 
          className="position-absolute start-0 end-0 top-0 bottom-0 opacity-10" 
          style={{
            backgroundImage: 'linear-gradient(rgba(212,175,55,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none'
          }}
        />

        <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
          
          {/* عنوان القسم */}
          <div className="row justify-content-center text-center mb-5">
            <div className="col-12 col-md-8">
              <h5 className="text-gold andalusian-font mb-2 fs-4">خدماتنا الملكية</h5>
              <h2 className="andalusian-font text-white fw-bold mb-3" style={{ fontSize: '2.8rem' }}>
                نرسم لك <span className="text-gold">تفاصيل</span> ليلة العمر باحترافية
              </h2>
              <p className="text-white-50 fs-5">
                توليفة متكاملة من الخدمات الفخمة التي نضمن من خلالها تلبية كافة رغباتكم واحتياجات ضيوفكم الكرام.
              </p>
            </div>
          </div>

          {/* شبكة كروت الخدمات */}
          <div className="row g-4 justify-content-center">
            {services.map((service, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-3 text-center">
                <div className="service-card p-4 h-100 d-flex flex-column justify-content-center">
                  
                  {/* الأيقونة */}
                  <div className="icon-wrapper">
                    {service.icon}
                  </div>

                  {/* العنوان والوصف */}
                  <h4 className="andalusian-font text-white fw-bold fs-4 mb-3">{service.title}</h4>
                  <p className="text-white-50 fs-6 lh-lg mb-0">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}