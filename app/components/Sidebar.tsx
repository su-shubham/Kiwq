import { useState } from 'react';
import { Link, useLocation } from '@remix-run/react';
import { SidebarSection, MenuItem } from '~/types/navigation';
import { IconButton } from '~/components/ui/IconButton';
import { Tooltip } from '~/components/ui/Tooltip';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const sections: SidebarSection[] = [
    {
      title: 'Overview',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: '📊',
          path: '/dashboard',
          badge: '3',
        },
      ],
    },
    {
      title: 'Response',
      items: [
        {
          id: 'playbooks',
          label: 'Playbooks',
          icon: '📋',
          path: '/playbooks',
          subItems: [
            { id: 'all-playbooks', label: 'All Playbooks', path: '/playbooks' },
            {
              id: 'new-playbook',
              label: 'New Playbook',
              path: '/playbooks/new',
            },
            { id: 'history', label: 'History', path: '/playbooks/history' },
          ],
        },
        {
          id: 'incidents',
          label: 'Incidents',
          icon: '🚨',
          path: '/incidents',
          badge: '2',
          subItems: [
            {
              id: 'live-incidents',
              label: 'Live Incidents',
              path: '/incidents',
            },
            {
              id: 'response-actions',
              label: 'Response Actions',
              path: '/incidents/actions',
            },
            {
              id: 'incident-history',
              label: 'History',
              path: '/incidents/history',
            },
          ],
        },
      ],
    },
    {
      title: 'Defense',
      items: [
        {
          id: 'honeypots',
          label: 'Honeypots',
          icon: '🎯',
          path: '/honeypots',
          subItems: [
            {
              id: 'active-honeypots',
              label: 'Active Honeypots',
              path: '/honeypots',
            },
            {
              id: 'deploy-honeypot',
              label: 'Deploy New',
              path: '/honeypots/deploy',
            },
            {
              id: 'analytics',
              label: 'Threat Analytics',
              path: '/honeypots/analytics',
            },
          ],
        },
        {
          id: 'defense',
          label: 'Defense Center',
          icon: '🛡️',
          path: '/defense',
          subItems: [
            {
              id: 'firewall',
              label: 'Firewall Status',
              path: '/defense/firewall',
            },
            { id: 'ids', label: 'Intrusion Detection', path: '/defense/ids' },
            {
              id: 'endpoint',
              label: 'Endpoint Security',
              path: '/defense/endpoint',
            },
          ],
        },
      ],
    },
    {
      title: 'Intelligence',
      items: [
        {
          id: 'threat-intel',
          label: 'Threat Intel',
          icon: '🔍',
          path: '/intel',
          subItems: [
            { id: 'live-feed', label: 'Live Feed', path: '/intel/feed' },
            {
              id: 'trending',
              label: 'Trending Attacks',
              path: '/intel/trending',
            },
            { id: 'actors', label: 'Threat Actors', path: '/intel/actors' },
          ],
        },
        {
          id: 'alerts',
          label: 'Alerts',
          icon: '🔔',
          path: '/alerts',
          badge: '5',
        },
      ],
    },
    {
      title: 'System',
      items: [
        {
          id: 'logs',
          label: 'Security Logs',
          icon: '📝',
          path: '/logs',
          subItems: [
            { id: 'system-logs', label: 'System Logs', path: '/logs/system' },
            { id: 'audit', label: 'Audit Trails', path: '/logs/audit' },
            {
              id: 'playbook-logs',
              label: 'Playbook Logs',
              path: '/logs/playbooks',
            },
          ],
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: '⚙️',
          path: '/settings',
        },
      ],
    },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div
      className={`h-screen bg-gray-900 border-r border-gray-800 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500" />
            <span className="font-bold text-lg">SecureAI</span>
          </div>
        )}
        <IconButton
          icon={isCollapsed ? '→' : '←'}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white"
        />
      </div>

      {/* Quick Actions */}
      <div
        className={`p-4 border-b border-gray-800 ${
          isCollapsed ? 'flex-col' : 'flex-row'
        }`}
      >
        <div className="flex gap-2 justify-center">
          <Tooltip content="New Incident" side="left">
            <IconButton
              icon="🚨"
              onClick={() => {}}
              className="bg-gray-800 hover:bg-gray-700"
            />
          </Tooltip>
          <Tooltip content="Active Alerts" side="right">
            <IconButton
              icon="🔔"
              onClick={() => {}}
              className="bg-gray-800 hover:bg-gray-700"
              badge="3"
            />
          </Tooltip>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="overflow-y-auto h-[calc(100vh-8rem)]">
        {sections.map((section) => (
          <div key={section.title} className="py-4">
            {!isCollapsed && (
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <div key={item.id}>
                  <Tooltip
                    content={isCollapsed ? item.label : undefined}
                    side="right"
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-2 text-sm ${
                        isActive(item.path)
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      } transition-colors`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {!isCollapsed && (
                        <>
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  </Tooltip>
                  {!isCollapsed && item.subItems && isActive(item.path) && (
                    <div className="ml-12 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.id}
                          to={subItem.path}
                          className={`block px-4 py-1.5 text-sm ${
                            location.pathname === subItem.path
                              ? 'text-blue-400'
                              : 'text-gray-400 hover:text-white'
                          } transition-colors`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* User Section */}
      <div className="bottom-0 border-t border-gray-800 p-4">
        <Tooltip
          content={isCollapsed ? 'User Settings' : undefined}
          side="right"
        >
          <button className="flex items-center gap-3 w-full hover:bg-gray-800 p-2 rounded-lg transition-colors">
            <div className="h-8 w-8 lg:h-4 lg:w-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
            {!isCollapsed && (
              <div className="text-left">
                <div className="text-sm font-semibold">John Doe</div>
                <div className="text-xs text-gray-400">Security Admin</div>
              </div>
            )}
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
