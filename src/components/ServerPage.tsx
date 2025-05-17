import React from 'react';

const ServerPage: React.FC = () => {
  const servers = [
    {
      name: "Los Santos Nightlife",
      players: "128/150",
      ping: 45,
      status: "online",
      map: "Downtown LS",
      difficulty: "Hard"
    },
    {
      name: "Night City Outskirts",
      players: "95/150",
      ping: 32,
      status: "online",
      map: "Sandy Shores",
      difficulty: "Medium"
    },
    {
      name: "Chrome & Neon",
      players: "150/150",
      ping: 28,
      status: "full",
      map: "Vespucci Beach",
      difficulty: "Extreme"
    },
    {
      name: "Corpo Wars",
      players: "63/150",
      ping: 19,
      status: "online",
      map: "Vinewood Heights",
      difficulty: "Medium"
    },
    {
      name: "Street Runners",
      players: "112/150",
      ping: 37,
      status: "online",
      map: "Mirror Park",
      difficulty: "Easy"
    }
  ];

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-gta text-neon-yellow tracking-wide">SERVER BROWSER</h1>
          <div className="flex space-x-2">
            <button className="bg-black/40 hover:bg-black/60 border border-neon-blue text-neon-blue text-sm px-4 py-1 rounded transition-all duration-300">
              REFRESH
            </button>
            <button className="bg-black/40 hover:bg-black/60 border border-neon-blue text-neon-blue text-sm px-4 py-1 rounded transition-all duration-300">
              FILTER
            </button>
          </div>
        </div>
        
        {/* Server stats */}
        <div className="flex space-x-4 mb-6">
          <div className="flex-1 bg-black/40 border border-neon-blue/30 rounded p-4">
            <div className="text-xs text-gray-400">TOTAL SERVERS</div>
            <div className="text-2xl font-mono text-neon-blue">5</div>
          </div>
          <div className="flex-1 bg-black/40 border border-neon-blue/30 rounded p-4">
            <div className="text-xs text-gray-400">PING</div>
            <div className="text-2xl font-mono text-neon-green">19-45ms</div>
          </div>
          <div className="flex-1 bg-black/40 border border-neon-blue/30 rounded p-4">
            <div className="text-xs text-gray-400">PLAYERS ONLINE</div>
            <div className="text-2xl font-mono text-neon-yellow">548</div>
          </div>
        </div>
        
        {/* Server list header */}
        <div className="grid grid-cols-12 gap-4 py-2 px-4 border-b border-neon-blue/30 text-xs text-gray-400">
          <div className="col-span-4">SERVER NAME</div>
          <div className="col-span-2">MAP</div>
          <div className="col-span-2">PLAYERS</div>
          <div className="col-span-1">PING</div>
          <div className="col-span-2">DIFFICULTY</div>
          <div className="col-span-1"></div>
        </div>
        
        <div className="space-y-3 mt-3">
          {servers.map((server, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 items-center bg-black/40 border border-neon-blue/30 rounded-lg p-4 hover:border-neon-yellow hover:bg-black/50 transition-all duration-300"
            >
              <div className="col-span-4">
                <h3 className="text-lg font-gta tracking-wide text-white flex items-center">
                  {server.status === 'online' && <span className="inline-block h-2 w-2 rounded-full bg-neon-green mr-2"></span>}
                  {server.status === 'full' && <span className="inline-block h-2 w-2 rounded-full bg-neon-red mr-2"></span>}
                  {server.name}
                </h3>
              </div>
              <div className="col-span-2 text-neon-cyan font-mono text-sm">{server.map}</div>
              <div className="col-span-2 text-sm">
                <span className={server.status === 'full' ? 'text-neon-red' : 'text-neon-green'}>
                  {server.players}
                </span>
              </div>
              <div className="col-span-1 text-neon-blue font-mono text-sm">{server.ping}ms</div>
              <div className="col-span-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  server.difficulty === 'Easy' ? 'bg-green-800/40 text-green-400' :
                  server.difficulty === 'Medium' ? 'bg-yellow-800/40 text-yellow-400' :
                  server.difficulty === 'Hard' ? 'bg-orange-800/40 text-orange-400' :
                  'bg-red-800/40 text-red-400'
                }`}>
                  {server.difficulty}
                </span>
              </div>
              <div className="col-span-1 flex justify-end">
                <button 
                  disabled={server.status === 'full'} 
                  className={`px-4 py-1 rounded text-sm font-bold transition-all duration-300 ${
                    server.status === 'full' 
                      ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed' 
                      : 'bg-neon-yellow text-black hover:bg-yellow-400'
                  }`}
                >
                  JOIN
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServerPage;