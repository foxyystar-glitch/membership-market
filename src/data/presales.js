// presaleDB (presales) - 분양 데이터

export const presales = [
  // 골프 분양 (7개)
  { id: 1, category: 'golf', c_id: 2, original_price: 38500, presale_price: 48000, status: 'available', display_flag: true },
  { id: 2, category: 'golf', c_id: 4, original_price: 41200, presale_price: 51000, status: 'available', display_flag: true },
  { id: 3, category: 'golf', c_id: 6, original_price: 36000, presale_price: 45000, status: 'available', display_flag: true },
  { id: 4, category: 'golf', c_id: 11, original_price: 39800, presale_price: 49500, status: 'available', display_flag: true },
  { id: 5, category: 'golf', c_id: 12, original_price: 31000, presale_price: 39000, status: 'available', display_flag: true },
  { id: 6, category: 'golf', c_id: 15, original_price: 28000, presale_price: 35000, status: 'available', display_flag: false },
  { id: 7, category: 'golf', c_id: 9, original_price: 33500, presale_price: 42000, status: 'sold_out', display_flag: false },

  // 콘도 분양 (5개)
  { id: 8, category: 'condo', c_id: 19, original_price: 520, presale_price: 650, status: 'available', display_flag: true },
  { id: 9, category: 'condo', c_id: 21, original_price: 580, presale_price: 720, status: 'available', display_flag: true },
  { id: 10, category: 'condo', c_id: 24, original_price: 480, presale_price: 600, status: 'available', display_flag: true },
  { id: 11, category: 'condo', c_id: 25, original_price: 620, presale_price: 770, status: 'available', display_flag: false },
  { id: 12, category: 'condo', c_id: 23, original_price: 650, presale_price: 810, status: 'sold_out', display_flag: false },

  // 피트니스 분양 (5개)
  { id: 13, category: 'fitness', c_id: 30, original_price: 410, presale_price: 510, status: 'available', display_flag: true },
  { id: 14, category: 'fitness', c_id: 31, original_price: 350, presale_price: 440, status: 'available', display_flag: true },
  { id: 15, category: 'fitness', c_id: 32, original_price: 320, presale_price: 400, status: 'available', display_flag: true },
  { id: 16, category: 'fitness', c_id: 33, original_price: 290, presale_price: 360, status: 'available', display_flag: false },
  { id: 17, category: 'fitness', c_id: 27, original_price: 380, presale_price: 475, status: 'sold_out', display_flag: false },
];

export default presales;
