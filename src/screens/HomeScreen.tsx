import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  Clock, 
  Users,
  MoreVertical,
  Folder,
  FileText,
  Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../contexts/ProjectContext';
import BottomNavigation from '../components/BottomNavigation';
import ProjectCard from '../components/ProjectCard';
import CreateProjectModal from '../components/CreateProjectModal';

const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const { projects } = useProjects();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterBy, setFilterBy] = useState<'all' | 'recent' | 'shared' | 'starred'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterBy === 'all' || 
      (filterBy === 'shared' && project.isShared) ||
      (filterBy === 'recent' && project.lastModified.includes('hour'));
    return matchesSearch && matchesFilter;
  });

  const quickActions = [
    { icon: FileText, label: 'Design file', type: 'design' as const },
    { icon: Zap, label: 'Prototype', type: 'prototype' as const },
    { icon: Users, label: 'Whiteboard', type: 'whiteboard' as const },
  ];

  return (
    <div className="min-h-screen bg-figma-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-figma-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h1 className="text-lg font-semibold text-figma-gray-900">
                  Good morning, {user?.name?.split(' ')[0]}
                </h1>
                <p className="text-sm text-figma-gray-600">Ready to create something amazing?</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-figma-purple text-white p-2 rounded-lg hover:bg-figma-purple/90 transition-colors"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-figma-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-3 bg-figma-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-figma-purple"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCreateModal(true)}
                className="flex flex-col items-center p-4 bg-figma-gray-100 rounded-lg hover:bg-figma-gray-200 transition-colors"
              >
                <action.icon className="w-6 h-6 text-figma-purple mb-2" />
                <span className="text-sm font-medium text-figma-gray-700">{action.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {[
                { key: 'all', label: 'All' },
                { key: 'recent', label: 'Recent' },
                { key: 'shared', label: 'Shared' },
                { key: 'starred', label: 'Starred' },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setFilterBy(filter.key as any)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterBy === filter.key
                      ? 'bg-figma-purple text-white'
                      : 'text-figma-gray-600 hover:bg-figma-gray-100'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 text-figma-gray-600 hover:bg-figma-gray-100 rounded-lg"
              >
                {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid3X3 className="w-5 h-5" />}
              </button>
              <button className="p-2 text-figma-gray-600 hover:bg-figma-gray-100 rounded-lg">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="p-4">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 text-figma-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-figma-gray-900 mb-2">No projects found</h3>
            <p className="text-figma-gray-600 mb-6">
              {searchQuery ? 'Try adjusting your search terms' : 'Create your first project to get started'}
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-figma-purple text-white px-6 py-3 rounded-lg font-medium hover:bg-figma-purple/90 transition-colors"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-3'}>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  viewMode={viewMode}
                  onOpen={() => navigate(`/editor/${project.id}`)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
      
      {showCreateModal && (
        <CreateProjectModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default HomeScreen;