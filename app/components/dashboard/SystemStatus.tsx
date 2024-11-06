interface SystemStatusProps {
  title: string;
  value: string;
  trend: string;
  status: 'critical' | 'warning' | 'good';
}

export default function SystemStatus({
  title,
  value,
  trend,
  status,
}: SystemStatusProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'from-red-500/20 to-red-900/20 text-red-400';
      case 'warning':
        return 'from-yellow-500/20 to-yellow-900/20 text-yellow-400';
      default:
        return 'from-green-500/20 to-green-900/20 text-green-400';
    }
  };

  const getTrendColor = (trend: string) => {
    return trend.startsWith('+') ? 'text-red-400' : 'text-green-400';
  };

  return (
    <div className={`bg-gradient-to-br ${getStatusColor(status)} pixel-border rounded-lg p-4`}>
      <h3 className="font-vt323 text-lg mb-2">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-press-start">{value}</span>
        <span className={`text-sm ${getTrendColor(trend)}`}>{trend}</span>
      </div>
    </div>
  );
}