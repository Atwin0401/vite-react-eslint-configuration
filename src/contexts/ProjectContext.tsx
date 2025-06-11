import React, { createContext, useContext, useState } from 'react';

interface Project {
  id: string;
  name: string;
  thumbnail: string;
  lastModified: string;
  collaborators: string[];
  isShared: boolean;
  type: 'design' | 'prototype' | 'whiteboard';
}

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  createProject: (name: string, type: Project['type']) => void;
  deleteProject: (id: string) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Mobile App Design',
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      lastModified: '2 hours ago',
      collaborators: ['user1', 'user2'],
      isShared: true,
      type: 'design'
    },
    {
      id: '2',
      name: 'Website Prototype',
      thumbnail: 'https://images.pexels.com/photos/326502/pexels-photo-326502.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      lastModified: '1 day ago',
      collaborators: ['user1'],
      isShared: false,
      type: 'prototype'
    },
    {
      id: '3',
      name: 'Brainstorming Session',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      lastModified: '3 days ago',
      collaborators: ['user1', 'user2', 'user3'],
      isShared: true,
      type: 'whiteboard'
    }
  ]);
  
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const createProject = (name: string, type: Project['type']) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      lastModified: 'Just now',
      collaborators: [],
      isShared: false,
      type
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      currentProject,
      setCurrentProject,
      createProject,
      deleteProject,
      updateProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
};