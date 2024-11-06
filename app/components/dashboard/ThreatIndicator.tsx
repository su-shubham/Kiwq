interface ThreatIndicatorProps {
  title: string;
  severity: 'critical' | 'warning' | 'low';
  timestamp: string;
  onClick: () => void;
  selected: boolean;
}

export default function ThreatIndicator({
  title,
  severity,
  timestamp,
  onClick,
  selected,
}: ThreatIndicatorProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 pixel-border rounded-lg transition-all ${
        selected
          ? 'bg-gray-800 border-blue-500'
          : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`h-3 w-3 rounded-full ${getSeverityColor(severity)} animate-pixel-pulse`} />
        <div className="flex-1">
          <h3 className="font-vt323 text-lg">{title}</h3>
          <p className="text-sm text-gray-400">{timestamp}</p>
        </div>
      </div>
    </button>
  );
}