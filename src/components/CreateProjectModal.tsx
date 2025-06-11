import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Zap, Users } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose }) => {
  const [projectName, setProjectName] = useState('');
  const [selectedType, setSelectedType] = useState<'design' | 'prototype' | 'whiteboard'>('design');
  const { createProject } = useProjects();

  const projectTypes = [
    {
      id: 'design' as const,
      icon: FileText,
      title: 'Design File',
      description: 'Create designs, wireframes, and mockups'
    },
    {
      id: 'prototype' as const,
      icon: Zap,
      title: 'Prototype',
      description: 'Build interactive prototypes and flows'
    },
    {
      id: 'whiteboard' as const,
      icon: Users,
      title: 'Whiteboard',
      description: 'Collaborate and brainstorm with your team'
    }
  ];

  const handleCreate = () => {
    if (projectName.trim()) {
      createProject(projectName.trim(), selectedType);
      setProjectName('');
      setSelectedType('design');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white rounded-2xl shadow-xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-figma-gray-900">Create New Project</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-figma-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-figma-gray-700 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                    className="w-full px-3 py-2 border border-figma-gray-300 rounded-lg focus:ring-2 focus:ring-figma-purple focus:border-transparent"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-figma-gray-700 mb-3">
                    Project Type
                  </label>
                  <div className="space-y-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          selectedType === type.id
                            ? 'border-figma-purple bg-figma-purple/5'
                            : 'border-figma-gray-200 hover:border-figma-gray-300'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <type.icon className={`w-6 h-6 mt-0.5 ${
                            selectedType === type.id ? 'text-figma-purple' : 'text-figma-gray-600'
                          }`} />
                          <div>
                            <h3 className={`font-medium ${
                              selectedType === type.id ? 'text-figma-purple' : 'text-figma-gray-900'
                            }`}>
                              {type.title}
                            </h3>
                            <p className="text-sm text-figma-gray-600 mt-1">
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 text-figma-gray-700 border border-figma-gray-300 rounded-lg hover:bg-figma-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!projectName.trim()}
                  className="flex-1 px-4 py-2 bg-figma-purple text-white rounded-lg hover:bg-figma-purple/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Project
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateProjectModal;