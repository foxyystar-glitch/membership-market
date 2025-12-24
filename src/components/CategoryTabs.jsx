import React from 'react';

const tabLabels = {
  golf: '골프',
  condo: '콘도',
  fitness: '피트니스'
};

const categoryColors = {
  golf: {
    text: 'text-green-600',
    border: 'border-green-600'
  },
  condo: {
    text: 'text-blue-600',
    border: 'border-blue-600'
  },
  fitness: {
    text: 'text-purple-600',
    border: 'border-purple-600'
  }
};

export default function CategoryTabs({ activeTab, setActiveTab, colorScheme = 'default' }) {
  const getTabStyle = (tab) => {
    if (activeTab === tab) {
      if (colorScheme === 'category') {
        const colors = categoryColors[tab];
        return `${colors.text} border-b-2 ${colors.border}`;
      } else if (colorScheme === 'red') {
        return 'text-red-600 border-b-2 border-red-600';
      } else {
        return 'text-green-600 border-b-2 border-green-600';
      }
    }
    return 'text-gray-500 hover:text-gray-700';
  };

  return (
    <div className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-2">
          {Object.keys(tabLabels).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-bold text-lg transition-colors ${getTabStyle(tab)}`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
