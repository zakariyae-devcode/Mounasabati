"use client";

import React, { useState } from 'react';

export default function ServiceReviews({ initialReviews = [], onAddReview }) {
  const [reviews, setReviews] = useState(
    initialReviews.length > 0
      ? initialReviews
      : [
          {
            id: 1,
            userName: 'سارة أ.',
            rating: 5,
            date: 'منذ يومين',
            comment: 'خدمة ممتازة جودة واحترافية عالية في التعامل، أنصح بالتعامل معهم!',
          },
          {
            id: 2,
            userName: 'محمد ك.',
            rating: 4,
            date: 'منذ أسبوع',
            comment: 'تجربة رائعة والتزام تام بالوقت المترتب عليه.',
          },
        ]
  );

  // حالة نموذج التقييم الجديد
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);

  // حساب متوسط التقييمات
  const averageRating =
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newEntry = {
      id: Date.now(),
      userName: 'أنت (زبون)',
      rating: newRating,
      date: 'الآن',
      comment: comment.trim(),
    };

    const updated = [newEntry, ...reviews];
    setReviews(updated);
    if (onAddReview) onAddReview(newEntry);

    // إعادة ضبط النموذج
    setComment('');
    setNewRating(5);
    setShowForm(false);
  };

  return (
    <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '20px', backgroundColor: '#FCFBF7' }} dir="rtl">
      {/* 1. ملخص التقييمات والزر الرئيسي */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between pb-3 mb-4 border-bottom gap-3">
        <div>
          <h4 className="fw-bold m-0" style={{ color: '#3D0B4F' }}>تقييمات الخدمة</h4>
          <div className="d-flex align-items-center gap-2 mt-2">
            <span className="fs-3 fw-bold" style={{ color: '#3D0B4F' }}>
              {averageRating.toFixed(1)}
            </span>
            <div className="d-flex text-warning">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`bi ${
                    star <= Math.round(averageRating) ? 'bi-star-fill' : 'bi-star'
                  } fs-5`}
                />
              ))}
            </div>
            <span className="text-muted small">({reviews.length} تقييم)</span>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn text-white px-4 py-2 fw-bold d-flex align-items-center gap-2 align-self-start align-self-md-center"
          style={{ background: 'linear-gradient(135deg, #5E1777 0%, #3D0B4F 100%)', borderRadius: '12px' }}
        >
          <i className={`bi ${showForm ? 'bi-x-lg' : 'bi-plus-circle'}`} />
          <span>{showForm ? 'إلغاء' : 'إضافة تقييم'}</span>
        </button>
      </div>

      {/* 2. نموذج كتابة تقييم جديد */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-3 mb-4 rounded-4 bg-white border">
          <h6 className="fw-bold mb-3" style={{ color: '#3D0B4F' }}>أضف تقييمك للخدمة</h6>
          
          {/* اختيار النجوم */}
          <div className="mb-3">
            <label className="form-label small text-muted d-block">حدد التقييم بالنجوم:</label>
            <div className="d-flex gap-1 text-warning fs-4 cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`bi ${
                    star <= (hoverRating || newRating) ? 'bi-star-fill' : 'bi-star'
                  }`}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setNewRating(star)}
                />
              ))}
            </div>
          </div>

          {/* نص التعليق */}
          <div className="mb-3">
            <textarea
              rows="3"
              className="form-control"
              placeholder="اكتب انطباعك وتفاصيل تجربتك مع الخدمة..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ borderRadius: '12px' }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn text-white px-4 py-2 fw-bold"
            style={{ backgroundColor: '#C9A227', borderRadius: '10px' }}
          >
            نشر التقييم
          </button>
        </form>
      )}

      {/* 3. قائمة التقييمات */}
      <div className="d-flex flex-column gap-3">
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev.id} className="p-3 rounded-3 bg-white border-bottom">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center gap-2">
                  <div 
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: '38px', height: '38px', color: '#5E1777' }}
                  >
                    {rev.userName.charAt(0)}
                  </div>
                  <div>
                    <h6 className="fw-bold m-0 small" style={{ color: '#3D0B4F' }}>{rev.userName}</h6>
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>{rev.date}</span>
                  </div>
                </div>

                {/* عرض النجوم الخاصة بالمرجع */}
                <div className="text-warning small">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`bi ${star <= rev.rating ? 'bi-star-fill' : 'bi-star'}`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-secondary m-0 small" style={{ lineHeight: '1.5' }}>
                {rev.comment}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-muted my-3 small">لا توجد تقييمات لهذه الخدمة بعد.</p>
        )}
      </div>
    </div>
  );
}