import { useState } from 'react';
import type { PlaybookStep } from '~/types/incidents';

interface ExecutionMonitorProps {
  incidentId: string;
}

const mockSteps: PlaybookStep[] = [
  {
    id: '1',
    title: 'Isolate Affected Systems',
    description: 'Disconnect compromised assets from the network',
    priority: 'high',
    status: 'completed',
    estimatedTime: '15m',
    completedAt: '2024-03-21T14:30:00Z',
  },
  {
    id: '2',
    title: 'Collect Initial Evidence',
    description: 'Gather system logs and memory dumps',
    priority: 'medium',
    status: 'in_progress',
    estimatedTime: '30m',
  },
];

export default function ExecutionMonitor({ incidentId }: ExecutionMonitorProps) {
  const [steps] = useState<PlaybookStep[]>(mockSteps);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Execution Progress</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">1/2 completed</span>
          <div className="w-24 h-2 bg-gray-800 rounded-full">
            <div className="w-1/2 h-full bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="relative">
        {steps.map((step, index) => (
          <div key={step.id} className="mb-4 last:mb-0">
            <div className="flex items-start gap-4">
              <div className="relative">
                <div
                  className={`w-4 h-4 rounded-full ${getStatusColor(step.status)}`}
                />
                {index < steps.length - 1 && (
                  <div className="absolute top-4 left-2 w-0.5 h-full -ml-px bg-gray-800" />
                )}
              </div>
              <div className="flex-1 bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{step.title}</h3>
                  <span className="text-xs text-gray-400">{step.estimatedTime}</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{step.description}</p>
                {step.completedAt && (
                  <span className="text-xs text-gray-500">
                    Completed at: {new Date(step.completedAt).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}