import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Crown, 
  FileText, 
  Users, 
  Star, 
  Award,
  ChevronRight,
  Edit3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../contexts/ProjectContext';
import BottomNavigation from '../components/BottomNavigation';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const { projects } = useProjects();

  const stats = [
    { label: 'Projects', value: projects.length, icon: FileText },
    { label: 'Collaborators', value: 12, icon: Users },
    { label: 'Favorites', value: 8, icon: Star },
  ];

  const menuItems = [
    { icon: Crown, label: 'Upgrade to Pro', color: 'text-figma-orange' },
    { icon: Settings, label: 'Settings', color: 'text-figma-gray-600' },
    { icon: Award, label: 'Achievements', color: 'text-figma-green' },
  ];

  return (
    <div className="min-h-screen bg-figma-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-figma-purple to-figma-blue px-4 pt-12 pb-8">
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg">
              <Edit3 className="w-4 h-4 text-figma-gray-600" />
            </button>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-1">{user?.name}</h1>
          <p className="text-white/80 mb-2">{user?.email}</p>
          
          <div className="flex items-center justify-center space-x-2">
            <Crown className="w-4 h-4 text-figma-orange" />
            <span className="text-white/90 text-sm font-medium capitalize">
              {user?.plan} Plan
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-figma-gray-100 p-3 rounded-lg mb-2 inline-block">
                  <stat.icon className="w-6 h-6 text-figma-purple" />
                </div>
                <p className="text-2xl font-bold text-figma-gray-900">{stat.value}</p>
                <p className="text-sm text-figma-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full flex items-center justify-between p-4 hover:bg-figma-gray-50 transition-colors border-b border-figma-gray-100 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="font-medium text-figma-gray-900">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-figma-gray-400" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-semibold text-figma-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="space-y-4">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-figma-gray-900">{project.name}</p>
                  <p className="text-sm text-figma-gray-600">Modified {project.lastModified}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 mt-6">
        <button
          onClick={logout}
          className="w-full bg-figma-red text-white py-3 rounded-lg font-medium hover:bg-figma-red/90 transition-colors"
        >
          Sign Out
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ProfileScreen;