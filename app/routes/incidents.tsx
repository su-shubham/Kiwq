import { useState } from 'react';
import ThreatDashboard from '~/components/incidents/ThreatDashboard';
import PlaybookGenerator from '~/components/incidents/PlaybookGenerator';
import ExecutionMonitor from '~/components/incidents/ExecutionMonitor';

export default function IncidentsPage() {
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Incident Response Center</h1>
          <p className="text-gray-400">AI-Powered Security Response Management</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Threat Dashboard - 8 columns on large screens */}
          <div className="lg:col-span-8">
            <ThreatDashboard onSelectIncident={setSelectedIncident} />
          </div>

          {/* Playbook and Execution - 4 columns on large screens */}
          <div className="lg:col-span-4 space-y-8">
            {selectedIncident ? (
              <>
                <PlaybookGenerator incidentId={selectedIncident} />
                <ExecutionMonitor incidentId={selectedIncident} />
              </>
            ) : (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
                <p className="text-gray-400">Select an incident to view playbook and execution details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}