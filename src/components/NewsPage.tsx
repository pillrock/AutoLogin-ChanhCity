import React from 'react';
import NewsCard from './NewsCard';

const NewsPage: React.FC = () => {
  const newsItems = [
    {
      title: "Major Update 2.0 Released",
      date: "2024-03-20",
      content: "Experience the biggest update yet with new maps, weapons, and gameplay mechanics."
    },
    {
      title: "Community Tournament Results",
      date: "2024-03-19",
      content: "Check out the winners of our latest community tournament and their amazing gameplay."
    },
    {
      title: "New Game Mode Preview",
      date: "2024-03-18",
      content: "Get ready for an exciting new game mode coming next month. Watch the preview now!"
    },
    {
      title: "Developer Q&A Session",
      date: "2024-03-17",
      content: "Join us for a live Q&A session with the development team this weekend."
    }
  ];

  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-neon-blue mb-8">Latest News</h1>
        <div className="space-y-4">
          {newsItems.map((news, index) => (
            <NewsCard
              key={index}
              title={news.title}
              date={news.date}
              content={news.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage; 