import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { useEffect, useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'MalSim - Advanced Malware Simulation Platform' },
    {
      name: 'description',
      content:
        'Professional-grade malware simulation platform for cybersecurity training',
    },
  ];
};

export default function Index() {
  const [attackIntensity, setAttackIntensity] = useState(0);
  const [serverHealth, setServerHealth] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setAttackIntensity((prev) => (prev + 0.5) % 100);
      setServerHealth((prev) => Math.max(prev - Math.random() * 0.5, 0));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1b26] text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Frame */}
        <div className="pixel-frame mb-16">
          <div className="bg-[#2a2a3a] p-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <h1 className="font-press-start text-4xl leading-relaxed">
                  <span className="cyber-gradient bg-clip-text">
                    Malware Simulation Platform
                  </span>
                </h1>
                <p className="text-xl text-gray-400">
                  Train your security team with real-world scenarios
                </p>
                <div className="flex gap-4">
                  <Link to="/dashboard" className="pixel-button inline-block">
                    Launch Dashboard
                  </Link>
                  <button className="pixel-button">Watch Demo</button>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-0 cyber-gradient opacity-20 blur-2xl"></div>
                  {/* Pixel Server Animation */}
                  <div className="mb-16">
                    <div className="relative w-full max-w-2xl mx-auto p-8 font-mono">
                      {/* Server Frame */}
                      <div className="relative border-4 border-[#4a4a5a] bg-[#1a1b26] p-6 shadow-lg">
                        {/* Pixel Art Server */}
                        <div className="flex justify-center mb-8">
                          <div className="relative">
                            <div className="w-32 h-48 bg-[#2a2a3a] border-2 border-[#4a4a5a] relative">
                              {/* Server LEDs */}
                              <div className="absolute top-2 right-2 flex flex-col gap-2">
                                <div
                                  className={`w-2 h-2 ${
                                    serverHealth > 66
                                      ? 'bg-green-500'
                                      : serverHealth > 33
                                      ? 'bg-yellow-500'
                                      : 'bg-red-500'
                                  }`}
                                />
                                <div
                                  className={`w-2 h-2 ${
                                    attackIntensity > 50
                                      ? 'bg-red-500'
                                      : 'bg-green-500'
                                  }`}
                                />
                              </div>
                              {/* Server Vents */}
                              <div className="absolute bottom-4 left-0 w-full flex justify-center">
                                <div className="grid grid-cols-4 gap-1">
                                  {Array.from({ length: 8 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className="w-2 h-1 bg-[#4a4a5a]"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            {/* Attack Visualization */}
                            {Array.from({ length: 12 }).map((_, i) => (
                              <div
                                key={i}
                                className="absolute"
                                style={{
                                  top: `${
                                    Math.sin(
                                      (attackIntensity + i * 30) *
                                        (Math.PI / 180)
                                    ) *
                                      20 +
                                    50
                                  }%`,
                                  left: `${
                                    -50 + ((attackIntensity + i * 30) % 200)
                                  }%`,
                                  transform: 'translate(-50%, -50%)',
                                }}
                              >
                                <div
                                  className="w-2 h-2 bg-red-500 animate-pulse"
                                  style={{
                                    opacity: Math.max(
                                      0,
                                      1 -
                                        ((attackIntensity + i * 30) % 200) / 100
                                    ),
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Server Status */}
                        <div className="space-y-4 text-sm text-[#4a4a5a]">
                          <div className="flex justify-between items-center">
                            <span>Server Health:</span>
                            <div className="w-48 h-4 bg-[#2a2a3a] border border-[#4a4a5a]">
                              <div
                                className="h-full bg-green-500 transition-all duration-200"
                                style={{ width: `${serverHealth}%` }}
                              />
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Attack Intensity:</span>
                            <div className="w-48 h-4 bg-[#2a2a3a] border border-[#4a4a5a]">
                              <div
                                className="h-full bg-red-500 transition-all duration-200"
                                style={{ width: `${attackIntensity}%` }}
                              />
                            </div>
                          </div>
                          <div className="font-vt323 text-xs space-y-1">
                            {Array.from({ length: 3 }).map((_, i) => (
                              <div key={i} className="font-mono text-green-500">
                                {`>${''.padStart(
                                  Math.random() * 32,
                                  '.'
                                )} CONNECTION_REFUSED`}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Scanlines Effect */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(74,74,90,0.1)] to-transparent bg-[length:100%_4px] animate-scan" />
                      </div>

                      {/* CRT Effect Border */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div
                          className="absolute inset-0 border-t-4 border-[#4a4a5a] opacity-30"
                          style={{ borderRadius: '100%/3%' }}
                        />
                        <div
                          className="absolute inset-0 border-b-4 border-[#4a4a5a] opacity-30"
                          style={{ borderRadius: '100%/3%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-[#2a2a3a] rounded-lg border-2 border-[#4a4a5a]"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="font-press-start text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: 'Threat Analysis',
    description: 'Real-time malware behavior analysis and visualization',
    icon: '🔬',
  },
  {
    title: 'Safe Environment',
    description: 'Isolated sandbox for risk-free malware testing',
    icon: '🛡️',
  },
  {
    title: 'AI Detection',
    description: 'Advanced AI-powered threat detection system',
    icon: '🤖',
  },
];
