import React, { useState, useMemo } from 'react';
import NewsCard from './NewsCard';
import { Search } from 'lucide-react';
type NewsType = 'update' | 'event' | 'maintenance' | 'guide';

const NewsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<NewsType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const newsItems = [
    {
      title: 'Cập Nhật Launcher Mới',
      date: '20/03/2024',
      content:
        'Launcher đã được nâng cấp với giao diện mới, tối ưu hiệu suất và thêm nhiều tính năng hấp dẫn. Trải nghiệm ngay để khám phá những điều mới mẻ!',
      author: 'Admin',
      type: 'update' as NewsType,
    },
    {
      title: 'Sự Kiện Đặc Biệt Cuối Tuần',
      date: '19/03/2024',
      content:
        'Tham gia ngay sự kiện đặc biệt cuối tuần này với nhiều phần thưởng giá trị. Thời gian: 20/03 - 22/03',
      author: 'Event Team',
      type: 'event' as NewsType,
    },
    {
      title: 'Bảo Trì Hệ Thống',
      date: '18/03/2024',
      content:
        'Launcher sẽ bảo trì từ 23:00 - 02:00 ngày 19/03 để nâng cấp hệ thống. Cảm ơn sự thông cảm của bạn!',
      author: 'System Admin',
      type: 'maintenance' as NewsType,
    },
    {
      title: 'Hướng Dẫn Sử Dụng Launcher',
      date: '17/03/2024',
      content:
        'Xem hướng dẫn chi tiết cách sử dụng các tính năng mới của launcher và tối ưu trải nghiệm chơi game của bạn.',
      author: 'Support Team',
      type: 'guide' as NewsType,
    },
  ];

  // Lọc và tìm kiếm bài đăng
  const filteredNews = useMemo(() => {
    return newsItems.filter((news) => {
      const matchesSearch =
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || news.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType]);

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-full w-full overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header với tìm kiếm và bộ lọc */}
        <div className="mb-8 flex flex-col space-y-4">
          {/* Thanh tìm kiếm */}
          <div className="relative flex items-center justify-center">
            <input
              type="text"
              placeholder="Tìm kiếm bài đăng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:border-neon-blue w-full rounded-lg border-none bg-black/40 px-4 py-2 pl-10 text-white placeholder-gray-400 outline-none focus:outline-none md:text-base"
            />
            <Search size={19} className="absolute left-2 text-gray-400" />
          </div>

          {/* Bộ lọc */}
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`rounded-lg px-4 py-2 transition-all ${
                selectedType === 'all'
                  ? 'bg-neon-blue text-white'
                  : 'bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30'
              }`}
            >
              Tất Cả
            </button>
            <button
              onClick={() => setSelectedType('update')}
              className={`rounded-lg px-4 py-2 transition-all ${
                selectedType === 'update'
                  ? 'bg-green-500 text-white'
                  : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
              }`}
            >
              Cập Nhật
            </button>
            <button
              onClick={() => setSelectedType('event')}
              className={`rounded-lg px-4 py-2 transition-all ${
                selectedType === 'event'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
              }`}
            >
              Sự Kiện
            </button>
            <button
              onClick={() => setSelectedType('maintenance')}
              className={`rounded-lg px-4 py-2 transition-all ${
                selectedType === 'maintenance'
                  ? 'bg-red-500 text-white'
                  : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
              }`}
            >
              Bảo Trì
            </button>
            <button
              onClick={() => setSelectedType('guide')}
              className={`rounded-lg px-4 py-2 transition-all ${
                selectedType === 'guide'
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
              }`}
            >
              Hướng Dẫn
            </button>
          </div>
        </div>

        {/* Danh sách bài đăng */}
        <div className="space-y-4">
          {paginatedNews.map((news, index) => (
            <NewsCard
              key={index}
              title={news.title}
              date={news.date}
              content={news.content}
              author={news.author}
              type={news.type}
            />
          ))}
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Trước
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`rounded-lg px-4 py-2 ${
                  currentPage === index + 1
                    ? 'bg-neon-blue text-white'
                    : 'bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
