import React from 'react';
import { colors } from '../config/colors';

/**
 * 공통 카드 컴포넌트
 * 크기: W 210px H 400px
 * 아이덴티티 컬러만 카테고리별로 다르게, 나머지는 공통
 */
const PropertyCard = ({
  category, // 'golf', 'condo', 'fitness', 'urgent'
  product_name, // 상품명 (기존 name)
  membership_name, // 회원권명 (신규 추가)
  location,
  price,
  rank, // 순위 배지 (옵션)
  status, // 거래 상태 (급매용, 옵션)
  onClick,
  item // 기존 호환성 유지
}) => {
  // item prop으로 전달된 경우 처리
  const cardProductName = product_name || item?.product_name || item?.name;
  const cardMembershipName = membership_name || item?.membership_name;
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
        height: '400px',
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
          alt={cardProductName}
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
        {/* Product Name - 본문 최상단 */}
        <div
          style={{
            fontSize: '18px',
            lineHeight: '120%',
            letterSpacing: '0%',
            fontWeight: 600,
            color: '#111111'
          }}
        >
          {cardProductName}
        </div>

        {/* Membership Name - 4px 여백 */}
        {cardMembershipName && (
          <div
            style={{
              marginTop: '4px',
              fontSize: '16px',
              lineHeight: '120%',
              letterSpacing: '0%',
              fontWeight: 500,
              color: '#111111'
            }}
          >
            {cardMembershipName}
          </div>
        )}

        {/* Location - 8px 여백 */}
        <div
          style={{
            marginTop: '8px',
            fontSize: '16px',
            lineHeight: '120%',
            letterSpacing: '0%',
            fontWeight: 500,
            color: '#717171'
          }}
        >
          {cardLocation}
        </div>

        {/* Price - 8px 여백 */}
        <div style={{ marginTop: '8px' }}>
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
        </div>

        {/* 문의하기 버튼 - 8px 여백, 높이 36px */}
        <button
          disabled={hasStatus && !isAvailable}
          style={{
            marginTop: '8px',
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
