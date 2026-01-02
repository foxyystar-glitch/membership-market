// priceDB (price_history) - 가격 히스토리 데이터
// 최근 30일간의 가격 데이터 (주요 상품 중심)

const generatePriceHistory = () => {
  const history = [];
  const today = new Date('2025-12-26');

  // 주요 상품 ID와 기준 가격
  const products = [
    { id: 1, category: 'golf', basePrice: 45000, volatility: 0.02 },
    { id: 2, category: 'golf', basePrice: 38500, volatility: 0.015 },
    { id: 3, category: 'golf', basePrice: 52000, volatility: 0.01 },
    { id: 4, category: 'golf', basePrice: 41200, volatility: 0.018 },
    { id: 5, category: 'golf', basePrice: 47800, volatility: 0.012 },
    { id: 8, category: 'golf', basePrice: 58000, volatility: 0.025 },
    { id: 14, category: 'golf', basePrice: 61000, volatility: 0.022 },
    { id: 16, category: 'condo', basePrice: 850, volatility: 0.04 },
    { id: 17, category: 'condo', basePrice: 1200, volatility: 0.02 },
    { id: 18, category: 'condo', basePrice: 680, volatility: 0.03 },
    { id: 19, category: 'condo', basePrice: 520, volatility: 0.035 },
    { id: 20, category: 'condo', basePrice: 950, volatility: 0.025 },
    { id: 26, category: 'fitness', basePrice: 450, volatility: 0.03 },
    { id: 27, category: 'fitness', basePrice: 380, volatility: 0.02 },
    { id: 28, category: 'fitness', basePrice: 520, volatility: 0.025 },
    { id: 29, category: 'fitness', basePrice: 680, volatility: 0.035 },
    { id: 30, category: 'fitness', basePrice: 410, volatility: 0.028 },
  ];

  let historyId = 1;

  products.forEach(product => {
    let currentPrice = product.basePrice;

    // 30일간의 가격 데이터 생성
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // 약간의 랜덤 변동
      const change = currentPrice * product.volatility * (Math.random() - 0.5) * 2;
      currentPrice = Math.round(currentPrice + change);

      // 최소/최대 가격 제한
      const minPrice = product.basePrice * 0.9;
      const maxPrice = product.basePrice * 1.1;
      currentPrice = Math.max(minPrice, Math.min(maxPrice, currentPrice));

      history.push({
        id: historyId++,
        c_id: product.id,
        category: product.category,
        date: date.toISOString().split('T')[0],
        price: currentPrice,
      });
    }
  });

  return history;
};

export const priceHistory = generatePriceHistory();

export default priceHistory;
