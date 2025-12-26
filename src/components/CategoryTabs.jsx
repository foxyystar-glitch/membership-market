import React from 'react';

/**
 * 카테고리 탭바 공통 컴포넌트
 * @param {string} activeTab - 현재 활성화된 탭 ('golf', 'condo', 'fitness')
 * @param {function} onTabChange - 탭 변경 핸들러
 * @param {string} variant - 탭 스타일 ('default', 'urgent', 'presale')
 */
export default function CategoryTabs({ activeTab, onTabChange, variant = 'default' }) {
  const tabLabels = {
    golf: '골프',
    condo: '콘도',
    fitness: '피트니스'
  };

  const getTabColors = (tab) => {
    const colors = {
      golf: { color: '#16a34a', border: 'border-green-600' },      // green-600
      condo: { color: '#2563eb', border: 'border-blue-600' },      // blue-600
      fitness: { color: '#9333ea', border: 'border-purple-600' }   // purple-600
    };
    return colors[tab];
  };

  // variant별 색상 설정
  const getVariantColor = () => {
    if (variant === 'urgent') {
      return { color: '#dc2626', border: 'border-red-600' };       // red-600
    } else if (variant === 'presale') {
      return { color: '#4f46e5', border: 'border-indigo-600' };    // indigo-600
    }
    return null; // default는 카테고리별 색상 사용
  };

  return (
    <div className="flex gap-2">
      {Object.keys(tabLabels).map(tab => {
        const colors = variant === 'default' ? getTabColors(tab) : getVariantColor();

        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-6 py-4 font-bold transition-colors ${
              activeTab === tab
                ? `border-b-2 ${colors.border}`
                : ''
            }`}
            style={{
              fontSize: '18px',
              color: activeTab === tab ? colors.color : '#999999'
            }}
          >
            {tabLabels[tab]}
          </button>
        );
      })}
    </div>
  );
}
