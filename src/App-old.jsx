import React, { useState } from 'react';
import MainPage from './pages/MainPage';
import CategoryPage from './pages/CategoryPage';
import PriceTablePage from './pages/PriceTablePage';
import UrgentSalePage from './pages/UrgentSalePage';
import PresalePage from './pages/PresalePage';
import InquiryPage from './pages/InquiryPage';

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [selectedCategory, setSelectedCategory] = useState('golf');

  const navigate = (page, category) => {
    setCurrentPage(page);
    if (category) {
      setSelectedCategory(category);
    }
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainPage navigate={navigate} />;
      case 'sise':
        return <PriceTablePage navigate={navigate} />;
      case 'category':
        return <CategoryPage navigate={navigate} category={selectedCategory} />;
      case 'urgent':
        return <UrgentSalePage navigate={navigate} />;
      case 'presale':
        return <PresalePage navigate={navigate} />;
      case 'inquiry':
        return <InquiryPage navigate={navigate} />;
      default:
        return <MainPage navigate={navigate} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
