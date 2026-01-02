import { useState } from 'react'
import { addMembership } from '../lib/supabase'

/**
 * 회원권 추가 폼 예제 (관리자용)
 */
export default function AddMembership() {
  const [formData, setFormData] = useState({
    category: 'golf',
    product_name: '',
    membership_name: '',
    location: '',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const result = await addMembership(formData)

      if (result) {
        setMessage(`✅ 회원권이 추가되었습니다! (ID: ${result.id})`)
        // 폼 초기화
        setFormData({
          category: 'golf',
          product_name: '',
          membership_name: '',
          location: '',
        })
      } else {
        setMessage('❌ 추가 실패. 다시 시도해주세요.')
      }
    } catch (error) {
      setMessage(`❌ 에러: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">회원권 추가</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 카테고리 */}
        <div>
          <label className="block mb-2 font-medium">카테고리</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="golf">골프</option>
            <option value="condo">콘도</option>
            <option value="fitness">피트니스</option>
          </select>
        </div>

        {/* 상품명 */}
        <div>
          <label className="block mb-2 font-medium">상품명</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            placeholder="예: 남서울"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* 회원권명 */}
        <div>
          <label className="block mb-2 font-medium">회원권명</label>
          <input
            type="text"
            name="membership_name"
            value={formData.membership_name}
            onChange={handleChange}
            placeholder="예: 일반"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* 지역 */}
        <div>
          <label className="block mb-2 font-medium">지역</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="예: 경기 성남"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white font-medium ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? '처리 중...' : '회원권 추가'}
        </button>
      </form>

      {/* 메시지 */}
      {message && (
        <div className={`mt-4 p-4 rounded ${
          message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}
    </div>
  )
}
