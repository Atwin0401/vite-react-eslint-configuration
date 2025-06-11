import React from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Users, Clock, Star } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  thumbnail: string;
  lastModified: string;
  collaborators: string[];
  isShared: boolean;
  type: 'design' | 'prototype' | 'whiteboard';
}

interface ProjectCardProps {
  project: Project;
  viewMode: 'grid' | 'list';
  onOpen: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, viewMode, onOpen }) => {
  const typeColors = {
    design: 'bg-figma-blue',
    prototype: 'bg-figma-green',
    whiteboard: 'bg-figma-orange'
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onOpen}
        className="bg-white rounded-lg p-4 shadow-sm border border-figma-gray-200 hover:shadow-md transition-all cursor-pointer"
      >
        <div className="flex items-center space-x-4">
          <img
            src={project.thumbnail}
            alt={project.name}
            className="w-16 h-12 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-figma-gray-900">{project.name}</h3>
              <div className={`w-2 h-2 rounded-full ${typeColors[project.type]}`}></div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-figma-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{project.lastModified}</span>
              </div>
              {project.collaborators.length > 0 && (
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{project.collaborators.length}</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle menu
            }}
            className="p-2 hover:bg-figma-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      className="bg-white rounded-lg shadow-sm border border-figma-gray-200 hover:shadow-md transition-all cursor-pointer overflow-hidden"
    >
      <div className="relative">
        <img
          src={project.thumbnail}
          alt={project.name}
          className="w-full h-32 object-cover"
        />
        <div className={`absolute top-2 left-2 w-3 h-3 rounded-full ${typeColors[project.type]}`}></div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle menu
          }}
          className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-lg transition-colors"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-figma-gray-900 mb-2 truncate">{project.name}</h3>
        <div className="flex items-center justify-between text-sm text-figma-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{project.lastModified}</span>
          </div>
          {project.collaborators.length > 0 && (
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{project.collaborators.length}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;