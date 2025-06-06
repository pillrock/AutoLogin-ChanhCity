import React from 'react';
import { CalendarDays } from 'lucide-react';
interface NewsCardProps {
  title: string;
  content: string;
  date: string;
  image?: string;
  onClick?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  content,
  date,
  image,
  onClick,
}) => {
  return (
    <div
      className="cursor-pointer rounded-lg bg-black/30 p-4 transition-all hover:bg-gray-800/50"
      onClick={onClick}
    >
      {image && (
        <div className="mb-4 h-48 overflow-hidden rounded-lg">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
      )}
      <h3 className="mb-2 text-base font-semibold">{title}</h3>
      <p className="mb-4 text-sm text-gray-300">{content}</p>
      <div className="flex items-center text-xs text-gray-400">
        <CalendarDays className="mr-2" />
        <span>{date}</span>
      </div>
    </div>
  );
};

export default NewsCard;
