import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface MetricData {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

const metrics: MetricData[] = [
  {
    label: 'Connection Attempts',
    data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 75],
    borderColor: 'rgb(59, 130, 246)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  {
    label: 'Attack Patterns',
    data: [28, 48, 40, 19, 86, 27, 90, 65, 45, 30],
    borderColor: 'rgb(239, 68, 68)',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
];

export default function MetricsChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h'],
        datasets: metrics,
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#9ca3af',
            },
          },
        },
        scales: {
          y: {
            grid: {
              color: 'rgba(75, 85, 99, 0.2)',
            },
            ticks: {
              color: '#9ca3af',
            },
          },
          x: {
            grid: {
              color: 'rgba(75, 85, 99, 0.2)',
            },
            ticks: {
              color: '#9ca3af',
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
      <canvas ref={chartRef} />
    </div>
  );
}