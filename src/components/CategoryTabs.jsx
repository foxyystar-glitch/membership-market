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
      golf: { text: 'text-green-600', border: 'border-green-600' },
      condo: { text: 'text-blue-600', border: 'border-blue-600' },
      fitness: { text: 'text-purple-600', border: 'border-purple-600' }
    };
    return colors[tab];
  };

  // variant별 색상 설정
  const getVariantColor = () => {
    if (variant === 'urgent') {
      return { text: 'text-red-600', border: 'border-red-600' };
    } else if (variant === 'presale') {
      return { text: 'text-indigo-600', border: 'border-indigo-600' };
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
            className={`px-6 py-4 font-bold text-lg transition-colors ${
              activeTab === tab
                ? `${colors.text} border-b-2 ${colors.border}`
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tabLabels[tab]}
          </button>
        );
      })}
    </div>
  );
}
