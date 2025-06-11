import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FolderOpen, User, Settings } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'home', icon: Home, label: 'Home', path: '/home' },
    { id: 'projects', icon: FolderOpen, label: 'Projects', path: '/projects' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-figma-gray-200 px-4 py-2 z-50">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-figma-purple'
                  : 'text-figma-gray-600 hover:text-figma-gray-900'
              }`}
            >
              <tab.icon className={`w-6 h-6 ${isActive ? 'text-figma-purple' : ''}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-figma-purple' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;