import { useState } from 'react';
import NetworkTopology from '~/components/NetworkTopology';
import ActivityTimeline from '~/components/ActivityTimeline';
import MetricsChart from '~/components/MetricsChart';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#1a1b26] text-gray-100 p-6">
      {/* Header */}
      <header className="bg-[#2a2a3a] border-2 border-[#4a4a5a] rounded-lg mb-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 cyber-gradient rounded-lg"></div>
            <div>
              <h1 className="font-press-start text-xl">MalSim</h1>
              <p className="text-sm text-gray-400">Security Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="pixel-button">
              Settings
            </button>
            <button className="pixel-button cyber-gradient">
              Deploy Defense
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-3 gap-4">
            {statusItems.map((item, index) => (
              <div key={index} className="bg-[#2a2a3a] border-2 border-[#4a4a5a] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="font-press-start text-sm">{item.label}</h3>
                </div>
                <div className="text-2xl font-press-start">{item.value}</div>
              </div>
            ))}
          </div>

          {/* Network Map */}
          <div className="bg-[#2a2a3a] border-2 border-[#4a4a5a] rounded-lg p-6">
            <h2 className="font-press-start text-xl mb-4">Network Map</h2>
            <NetworkTopology />
          </div>

          {/* Metrics */}
          <div className="bg-[#2a2a3a] border-2 border-[#4a4a5a] rounded-lg p-6">
            <h2 className="font-press-start text-xl mb-4">Activity Metrics</h2>
            <MetricsChart />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#2a2a3a] border-2 border-[#4a4a5a] rounded-lg p-6">
            <h2 className="font-press-start text-xl mb-4">Activity Log</h2>
            <ActivityTimeline />
          </div>
        </div>
      </div>
    </div>
  );
}

const statusItems = [
  { icon: "🛡️", label: "Defense Status", value: "Active" },
  { icon: "⚠️", label: "Threats", value: "2" },
  { icon: "🔒", label: "Security", value: "97%" },
];