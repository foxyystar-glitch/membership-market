import React from 'react';
import { colors, borderColors } from '../config/colors';

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
    return {
      color: colors[tab],
      border: borderColors[tab]
    };
  };

  // variant별 색상 설정
  const getVariantColor = () => {
    if (variant === 'urgent') {
      return { color: colors.urgent, border: borderColors.urgent };
    } else if (variant === 'presale') {
      return { color: colors.presale, border: borderColors.presale };
    }
    return null; // default는 카테고리별 색상 사용
  };

  return (
    <div className="flex gap-2">
      {Object.keys(tabLabels).map(tab => {
        const tabColors = variant === 'default' ? getTabColors(tab) : getVariantColor();

        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-6 py-4 font-bold transition-colors ${
              activeTab === tab
                ? `border-b-2 ${tabColors.border}`
                : ''
            }`}
            style={{
              fontSize: '18px',
              color: activeTab === tab ? tabColors.color : colors.textGray
            }}
          >
            {tabLabels[tab]}
          </button>
        );
      })}
    </div>
  );
}
