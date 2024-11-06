import { useState, useEffect } from 'react';
import type { PlaybookStep } from '~/types/incidents';

interface PlaybookGeneratorProps {
  incidentId: string;
}

const mockPlaybook: PlaybookStep[] = [
  {
    id: '1',
    title: 'Isolate Affected Systems',
    description: 'Disconnect compromised assets from the network',
    priority: 'high',
    status: 'pending',
    estimatedTime: '15m',
  },
  {
    id: '2',
    title: 'Collect Initial Evidence',
    description: 'Gather system logs and memory dumps',
    priority: 'medium',
    status: 'pending',
    estimatedTime: '30m',
  },
];

export default function PlaybookGenerator({ incidentId }: PlaybookGeneratorProps) {
  const [steps, setSteps] = useState<PlaybookStep[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Simulate AI generation
    setIsGenerating(true);
    const timer = setTimeout(() => {
      setSteps(mockPlaybook);
      setIsGenerating(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [incidentId]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 text-red-400';
      case 'medium':
        return 'border-yellow-500 text-yellow-400';
      default:
        return 'border-blue-500 text-blue-400';
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Response Playbook</h2>
        <button className="px-4 py-2 bg-blue-500 rounded-lg text-sm hover:bg-blue-400 transition-colors">
          Customize
        </button>
      </div>

      {isGenerating ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-pulse text-gray-400">Generating playbook...</div>
        </div>
      ) : (
        <div className="space-y-4">
          {steps.map(step => (
            <div
              key={step.id}
              className="bg-gray-800 rounded-lg p-4 border-l-4 transition-colors"
              className={`bg-gray-800 rounded-lg p-4 border-l-4 ${getPriorityColor(step.priority)}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{step.title}</h3>
                <span className="text-xs text-gray-400">{step.estimatedTime}</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">{step.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs px-2 py-1 bg-gray-700 rounded">
                  Priority: {step.priority}
                </span>
                <button className="text-sm text-blue-400 hover:text-blue-300">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}