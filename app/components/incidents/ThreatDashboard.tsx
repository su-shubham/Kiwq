import { useState } from 'react';
import type { Incident } from '~/types/incidents';

interface ThreatDashboardProps {
  onSelectIncident: (id: string) => void;
}

const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'Ransomware Detection',
    severity: 'critical',
    category: 'ransomware',
    timestamp: new Date().toISOString(),
    status: 'active',
    affectedAssets: ['DB-01', 'APP-03'],
    description: 'Encrypted files detected across multiple systems',
  },
  {
    id: '2',
    title: 'Phishing Campaign',
    severity: 'high',
    category: 'phishing',
    timestamp: new Date().toISOString(),
    status: 'investigating',
    affectedAssets: ['MAIL-01'],
    description: 'Mass phishing attempt targeting executive accounts',
  },
];

export default function ThreatDashboard({ onSelectIncident }: ThreatDashboardProps) {
  const [filter, setFilter] = useState<'all' | 'critical' | 'high'>('all');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-500/20 text-red-400';
      case 'investigating':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredIncidents = mockIncidents.filter(
    incident => filter === 'all' || incident.severity === filter
  );

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Active Threats</h2>
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
            onClick={() => setFilter('critical')}
            className={`px-3 py-1 rounded-lg ${
              filter === 'critical'
                ? 'bg-red-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Critical
          </button>
          <button
            onClick={() => setFilter('high')}
            className={`px-3 py-1 rounded-lg ${
              filter === 'high'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            High
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredIncidents.map(incident => (
          <div
            key={incident.id}
            onClick={() => onSelectIncident(incident.id)}
            className="bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${getSeverityColor(incident.severity)}`} />
                <h3 className="font-semibold">{incident.title}</h3>
              </div>
              <span className={`px-2 py-1 rounded-lg text-xs ${getStatusBadge(incident.status)}`}>
                {incident.status}
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-2">{incident.description}</p>
            <div className="flex gap-2">
              {incident.affectedAssets.map(asset => (
                <span
                  key={asset}
                  className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300"
                >
                  {asset}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}