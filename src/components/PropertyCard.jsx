import React from 'react';
import { colors } from '../config/colors';

/**
 * 공통 카드 컴포넌트
 * 크기: W 210px H 395px
 * 아이덴티티 컬러만 카테고리별로 다르게, 나머지는 공통
 */
const PropertyCard = ({
  category, // 'golf', 'condo', 'fitness', 'urgent'
  name,
  location,
  price,
  rank, // 순위 배지 (옵션)
  originalPrice, // 할인 전 가격 (급매용, 옵션)
  discount, // 할인율 (급매용, 옵션)
  status, // 거래 상태 (급매용, 옵션)
  onClick,
  item // 기존 호환성 유지
}) => {
  // item prop으로 전달된 경우 처리
  const cardName = name || item?.name;
  const cardLocation = location || item?.location;
  const cardPrice = price || item?.price;

  // 카테고리별 아이덴티티 컬러
  const identityColor = colors[category] || colors.golf;

  // 거래/분양 상태 확인
  const hasStatus = Boolean(status);
  const isAvailable = status === '거래가능' || status === '분양가능';
  const isUrgentSale = status === '거래가능' || status === '거래완료';
  const isPresale = status === '분양가능' || status === '분양완료';

  // 상태에 따른 배지 색상
  const getBadgeColor = () => {
    if (!hasStatus) return identityColor;
    if (isAvailable) {
      return isUrgentSale ? colors.urgent : identityColor;
    }
    return '#BDBDBD'; // 거래완료/분양완료 색상 통일
  };

  // 버튼 텍스트 결정
  const getButtonText = () => {
    if (!hasStatus) return '문의하기';
    if (isUrgentSale) return isAvailable ? '문의하기' : '거래완료';
    if (isPresale) return isAvailable ? '문의하기' : '분양완료';
    return '문의하기';
  };

  return (
    <div
      className="transition-all hover:shadow-lg"
      onClick={onClick}
      style={{
        width: '210px',
        height: '395px',
        borderRadius: '5px',
        backgroundColor: '#F6F5FD',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* 순위 배지 (TOP 5용) */}
      {rank && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            width: '30px',
            height: '30px',
            backgroundColor: identityColor,
            color: '#ffffff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '16px',
            zIndex: 5,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
        >
          {rank}
        </div>
      )}

      {/* 거래/분양 상태 배지 */}
      {hasStatus && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            padding: '4px 12px',
            backgroundColor: getBadgeColor(),
            color: '#ffffff',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 700,
            zIndex: 5,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
        >
          {status}
        </div>
      )}

      {/* 썸네일 영역 - 210x210 */}
      <div
        style={{
          width: '210px',
          height: '210px',
          flexShrink: 0,
          backgroundColor: '#E8E8E8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img
          src="/thumbnail_tmp.png"
          alt={cardName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = `<div style="font-size: 60px; user-select: none;">🏷️</div>`;
          }}
        />
      </div>

      {/* 본문 영역 - 나머지 185px */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '16px'
        }}
      >
        {/* Name - 본문 최상단 */}
        <div
          style={{
            fontSize: '18px',
            lineHeight: '120%',
            letterSpacing: '0%',
            fontWeight: 600,
            color: '#111111'
          }}
        >
          {cardName}
        </div>

        {/* Location - 10px 여백 */}
        <div
          style={{
            marginTop: '10px',
            fontSize: '16px',
            lineHeight: '120%',
            letterSpacing: '0%',
            fontWeight: 500,
            color: '#717171'
          }}
        >
          {cardLocation}
        </div>

        {/* Price - 14px 여백 */}
        <div style={{ marginTop: '14px' }}>
          {/* 할인 전 가격 (급매용) */}
          {originalPrice && (
            <div
              style={{
                fontSize: '12px',
                color: '#9E9E9E',
                textDecoration: 'line-through',
                marginBottom: '4px'
              }}
            >
              {originalPrice}만원
            </div>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
              <span
                style={{
                  fontSize: '28px',
                  lineHeight: '120%',
                  letterSpacing: '0%',
                  fontWeight: 700,
                  color: hasStatus && !isAvailable ? '#BDBDBD' : identityColor
                }}
              >
                {typeof cardPrice === 'number' ? cardPrice.toLocaleString() : cardPrice}
              </span>
              <span
                style={{
                  fontSize: '16px',
                  lineHeight: '120%',
                  letterSpacing: '0%',
                  fontWeight: 500,
                  color: '#717171'
                }}
              >
                만원
              </span>
            </div>

            {/* 할인율 배지 (급매용) */}
            {discount && (
              <div
                style={{
                  padding: '4px 8px',
                  backgroundColor: getBadgeColor(),
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 700,
                  borderRadius: '2px'
                }}
              >
                {discount}% ↓
              </div>
            )}
          </div>
        </div>

        {/* 문의하기 버튼 - 14px 여백, 높이 36px */}
        <button
          disabled={hasStatus && !isAvailable}
          style={{
            marginTop: 'auto',
            height: '36px',
            borderRadius: '2px',
            backgroundColor: hasStatus && !isAvailable ? '#BDBDBD' : identityColor,
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: 600,
            border: 'none',
            cursor: hasStatus && !isAvailable ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => {
            if (!(hasStatus && !isAvailable)) {
              e.target.style.opacity = '0.9';
            }
          }}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
