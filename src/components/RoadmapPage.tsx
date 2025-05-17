import React from 'react';

const RoadmapPage: React.FC = () => {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Foundation",
      status: "completed",
      items: [
        "Basic game mechanics",
        "Core maps and weapons",
        "Server infrastructure"
      ]
    },
    {
      phase: "Phase 2",
      title: "Expansion",
      status: "in-progress",
      items: [
        "New game modes",
        "Additional maps",
        "Weapon customization"
      ]
    },
    {
      phase: "Phase 3",
      title: "Innovation",
      status: "upcoming",
      items: [
        "Advanced AI systems",
        "Community features",
        "Esports integration"
      ]
    }
  ];

  return (
    <div className="w-full h-full p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-neon-blue mb-8">Development Roadmap</h1>
        <div className="space-y-8">
          {roadmapItems.map((phase, index) => (
            <div
              key={index}
              className="bg-black/50 border-2 border-neon-blue rounded-lg p-6 hover:border-neon-pink transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">{phase.phase}</h2>
                <span className={`px-4 py-1 rounded-full text-sm ${
                  phase.status === 'completed' ? 'bg-green-500' :
                  phase.status === 'in-progress' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`}>
                  {phase.status.toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl text-neon-pink mb-4">{phase.title}</h3>
              <ul className="space-y-2">
                {phase.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-gray-300">
                    <span className="mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage; 