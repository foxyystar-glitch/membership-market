// urgentDB (urgent_sales) - 급매 데이터

export const urgentSales = [
  // 골프 급매 (8개)
  { id: 1, category: 'golf', c_id: 1, original_price: 45000, urgent_price: 42000, status: 'available', display_flag: true },
  { id: 2, category: 'golf', c_id: 3, original_price: 52000, urgent_price: 48000, status: 'available', display_flag: true },
  { id: 3, category: 'golf', c_id: 5, original_price: 47800, urgent_price: 44500, status: 'available', display_flag: true },
  { id: 4, category: 'golf', c_id: 8, original_price: 58000, urgent_price: 54000, status: 'available', display_flag: true },
  { id: 5, category: 'golf', c_id: 10, original_price: 44200, urgent_price: 41000, status: 'available', display_flag: true },
  { id: 6, category: 'golf', c_id: 13, original_price: 42500, urgent_price: 39800, status: 'available', display_flag: false },
  { id: 7, category: 'golf', c_id: 14, original_price: 61000, urgent_price: 57500, status: 'sold_out', display_flag: false },
  { id: 8, category: 'golf', c_id: 7, original_price: 29500, urgent_price: 27000, status: 'available', display_flag: false },

  // 콘도 급매 (5개)
  { id: 9, category: 'condo', c_id: 17, original_price: 1200, urgent_price: 1100, status: 'available', display_flag: true },
  { id: 10, category: 'condo', c_id: 20, original_price: 950, urgent_price: 880, status: 'available', display_flag: true },
  { id: 11, category: 'condo', c_id: 16, original_price: 850, urgent_price: 780, status: 'available', display_flag: true },
  { id: 12, category: 'condo', c_id: 22, original_price: 720, urgent_price: 670, status: 'available', display_flag: false },
  { id: 13, category: 'condo', c_id: 18, original_price: 680, urgent_price: 620, status: 'sold_out', display_flag: false },

  // 피트니스 급매 (4개)
  { id: 14, category: 'fitness', c_id: 29, original_price: 680, urgent_price: 620, status: 'available', display_flag: true },
  { id: 15, category: 'fitness', c_id: 28, original_price: 520, urgent_price: 470, status: 'available', display_flag: true },
  { id: 16, category: 'fitness', c_id: 26, original_price: 450, urgent_price: 410, status: 'available', display_flag: true },
  { id: 17, category: 'fitness', c_id: 34, original_price: 580, urgent_price: 530, status: 'sold_out', display_flag: false },
];

export default urgentSales;
