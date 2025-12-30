import React, { useEffect } from 'react';

/**
 * 상세보기 모달 컴포넌트
 * 전체 배경: #111111 투명도 30%
 * 위아래 패딩: 48px
 * 카드: 960px 너비, 자동 높이, 5px 라운드, 1px #BDBDBD 보더
 */
const DetailModal = ({ isOpen, onClose, children }) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(17, 17, 17, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 0',
        zIndex: 1000,
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '960px',
          maxWidth: 'calc(100vw - 48px)',
          backgroundColor: '#FFFFFF',
          borderRadius: '5px',
          border: '1px solid #BDBDBD',
          minHeight: 'fit-content',
          maxHeight: 'calc(100vh - 96px)',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default DetailModal;
