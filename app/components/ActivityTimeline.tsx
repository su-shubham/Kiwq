import { useState } from 'react';

interface TimelineEvent {
  id: string;
  timestamp: string;
  type: 'connection' | 'attack' | 'alert';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

const events: TimelineEvent[] = [
  {
    id: '1',
    timestamp: '2024-03-21 14:23:45',
    type: 'connection',
    title: 'New Connection Detected',
    description: 'IP: 192.168.1.100 attempted SSH connection',
    severity: 'low',
  },
  {
    id: '2',
    timestamp: '2024-03-21 14:24:12',
    type: 'attack',
    title: 'Brute Force Attack',
    description: 'Multiple failed login attempts detected',
    severity: 'high',
  },
  {
    id: '3',
    timestamp: '2024-03-21 14:25:00',
    type: 'alert',
    title: 'Suspicious File Access',
    description: 'Attempted access to sensitive system files',
    severity: 'medium',
  },
];

export default function ActivityTimeline() {
  const [filter, setFilter] = useState<'all' | 'connection' | 'attack' | 'alert'>('all');

  const filteredEvents = events.filter(
    event => filter === 'all' || event.type === filter
  );

  const getSeverityColor = (severity: TimelineEvent['severity']) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'high':
        return 'bg-red-500';
    }
  };

  const getTypeIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'connection':
        return '🔌';
      case 'attack':
        return '⚠️';
      case 'alert':
        return '🚨';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-lg ${
            filter === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('connection')}
          className={`px-3 py-1 rounded-lg ${
            filter === 'connection'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Connections
        </button>
        <button
          onClick={() => setFilter('attack')}
          className={`px-3 py-1 rounded-lg ${
            filter === 'attack'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Attacks
        </button>
        <button
          onClick={() => setFilter('alert')}
          className={`px-3 py-1 rounded-lg ${
            filter === 'alert'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Alerts
        </button>
      </div>

      <div className="space-y-4">
        {filteredEvents.map(event => (
          <div
            key={event.id}
            className="flex items-start gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700"
          >
            <div className="flex-shrink-0 text-2xl">{getTypeIcon(event.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{event.title}</h4>
                <div className={`h-2 w-2 rounded-full ${getSeverityColor(event.severity)}`} />
              </div>
              <p className="text-sm text-gray-400">{event.description}</p>
              <p className="text-xs text-gray-500 mt-1">{event.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}