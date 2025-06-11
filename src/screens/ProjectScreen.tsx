import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Grid3X3, List } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';
import BottomNavigation from '../components/BottomNavigation';
import ProjectCard from '../components/ProjectCard';
import CreateProjectModal from '../components/CreateProjectModal';
import { useNavigate } from 'react-router-dom';

const ProjectScreen: React.FC = () => {
  const { projects } = useProjects();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-figma-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-figma-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-figma-gray-900">Projects</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-figma-purple text-white p-2 rounded-lg hover:bg-figma-purple/90 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-figma-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-3 bg-figma-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-figma-purple"
            />
          </div>
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-3 text-figma-gray-600 hover:bg-figma-gray-100 rounded-lg transition-colors"
          >
            {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid3X3 className="w-5 h-5" />}
          </button>
          <button className="p-3 text-figma-gray-600 hover:bg-figma-gray-100 rounded-lg transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="p-4">
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

export default ProjectScreen;