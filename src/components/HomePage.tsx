import React from 'react';
import GameCard from './GameCard';
import NewsCard from './NewsCard';

const HomePage: React.FC = () => {
  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      <div className="grid xl:grid-cols-2 md:grid-cols-1 gap-6">
        {/* Featured Games Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-neon-blue">Featured Games</h2>
          <div className="grid xl:grid-cols-2 md:grid-cols-1 gap-4">
            <GameCard
              title="Vietnam Legacy"
              image="https://via.placeholder.com/300x200"
              description="Experience the ultimate Vietnam War simulation"
              status="online"
            />
            <GameCard
              title="Special Forces"
              image="https://via.placeholder.com/300x200"
              description="Join elite forces in intense combat"
              status="offline"
            />
          </div>
        </div>

        {/* Latest News Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-neon-pink">Latest News</h2>
          <div className="space-y-4">
            <NewsCard
              title="New Update Released"
              date="2024-03-20"
              content="Major game update with new features and improvements"
            />
            <NewsCard
              title="Community Event"
              date="2024-03-19"
              content="Join our weekend tournament for exclusive rewards"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 