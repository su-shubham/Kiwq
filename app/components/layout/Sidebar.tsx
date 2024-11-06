import { useState } from 'react';
import { Link, useLocation } from '@remix-run/react';

const menuItems = [
  { icon: "🎮", label: "Dashboard", path: "/dashboard" },
  { icon: "🔬", label: "Analysis", path: "/analysis" },
  { icon: "🛡️", label: "Defense", path: "/defense" },
  { icon: "🤖", label: "AI Training", path: "/training" },
  { icon: "📊", label: "Reports", path: "/reports" },
  { icon: "⚙️", label: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={`h-screen bg-[#2a2a3a] border-r-2 border-[#4a4a5a] transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b-2 border-[#4a4a5a]">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg cyber-gradient"></div>
            <span className="font-press-start text-sm">MalSim</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-2xl hover:text-gray-300 transition-colors"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
              location.pathname === item.path
                ? 'bg-[#3a3a4a] text-white'
                : 'text-gray-400 hover:bg-[#3a3a4a] hover:text-white'
            } transition-colors`}
          >
            <span className="text-xl">{item.icon}</span>
            {!isCollapsed && (
              <span className="font-press-start text-sm">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="absolute bottom-0 w-full border-t-2 border-[#4a4a5a] p-4">
        <button className="flex items-center gap-3 w-full hover:bg-[#3a3a4a] p-2 rounded-lg transition-colors">
          <div className="h-8 w-8 rounded-full cyber-gradient"></div>
          {!isCollapsed && (
            <div className="text-left">
              <div className="text-sm font-press-start">Admin</div>
              <div className="text-xs text-gray-400">Security</div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}