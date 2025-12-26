// 중앙 데이터 내보내기
export { memberships } from './memberships.js';
export { priceHistory } from './priceHistory.js';
export { urgentSales } from './urgentSales.js';
export { presales } from './presales.js';

// 유틸리티 함수들

/**
 * 카테고리별 회원권 필터링
 */
export const getMembershipsByCategory = (category) => {
  const { memberships } = require('./memberships.js');
  return memberships.filter(m => m.category === category && m.active_flag);
};

/**
 * 메인 페이지 시세표에 표시할 TOP 5 가져오기
 */
export const getTopRankMemberships = (category) => {
  const { memberships } = require('./memberships.js');
  return memberships
    .filter(m => m.category === category && m.display_flag && m.rank !== null)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 5);
};

/**
 * 특정 회원권의 가격 히스토리 가져오기
 */
export const getPriceHistoryById = (membershipId) => {
  const { priceHistory } = require('./priceHistory.js');
  return priceHistory
    .filter(p => p.c_id === membershipId)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * 메인 페이지 급매정보 섹션에 표시할 데이터
 */
export const getDisplayUrgentSales = (category) => {
  const { urgentSales } = require('./urgentSales.js');
  const { memberships } = require('./memberships.js');

  return urgentSales
    .filter(u => u.category === category && u.display_flag && u.status === 'available')
    .map(urgent => {
      const membership = memberships.find(m => m.id === urgent.c_id);
      return {
        ...urgent,
        name: membership?.name,
        location: membership?.location,
      };
    });
};

/**
 * 메인 페이지 분양정보 섹션에 표시할 데이터
 */
export const getDisplayPresales = (category) => {
  const { presales } = require('./presales.js');
  const { memberships } = require('./memberships.js');

  return presales
    .filter(p => p.category === category && p.display_flag && p.status === 'available')
    .map(presale => {
      const membership = memberships.find(m => m.id === presale.c_id);
      return {
        ...presale,
        name: membership?.name,
        location: membership?.location,
      };
    });
};

/**
 * 급매 페이지용: 카테고리별 모든 급매 상품
 */
export const getAllUrgentSalesByCategory = (category) => {
  const { urgentSales } = require('./urgentSales.js');
  const { memberships } = require('./memberships.js');

  return urgentSales
    .filter(u => u.category === category && u.status === 'available')
    .map(urgent => {
      const membership = memberships.find(m => m.id === urgent.c_id);
      return {
        ...urgent,
        name: membership?.name,
        location: membership?.location,
        current_price: membership?.current_price,
      };
    });
};

/**
 * 분양 페이지용: 카테고리별 모든 분양 상품
 */
export const getAllPresalesByCategory = (category) => {
  const { presales } = require('./presales.js');
  const { memberships } = require('./memberships.js');

  return presales
    .filter(p => p.category === category && p.status === 'available')
    .map(presale => {
      const membership = memberships.find(m => m.id === presale.c_id);
      return {
        ...presale,
        name: membership?.name,
        location: membership?.location,
        current_price: membership?.current_price,
      };
    });
};
