import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, PanInfo } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  Share2, 
  Users, 
  Undo, 
  Redo,
  Square,
  Circle,
  Type,
  Image,
  Pen,
  Move,
  ZoomIn,
  ZoomOut,
  Layers,
  Palette,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';
import ToolPanel from '../components/ToolPanel';
import LayerPanel from '../components/LayerPanel';
import PropertyPanel from '../components/PropertyPanel';
import Canvas from '../components/Canvas';

interface CanvasElement {
  id: string;
  type: 'rectangle' | 'circle' | 'text' | 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  text?: string;
  fontSize?: number;
  selected: boolean;
}

const EditorScreen: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, currentProject, setCurrentProject } = useProjects();
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [showLayers, setShowLayers] = useState(false);
  const [showProperties, setShowProperties] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setCurrentProject(project);
    }
  }, [projectId, projects, setCurrentProject]);

  const tools = [
    { id: 'select', icon: Move, label: 'Select' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'pen', icon: Pen, label: 'Pen' },
    { id: 'image', icon: Image, label: 'Image' },
  ];

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const handleCanvasClick = (x: number, y: number) => {
    if (selectedTool !== 'select') {
      const newElement: CanvasElement = {
        id: Date.now().toString(),
        type: selectedTool as any,
        x: x - 50,
        y: y - 50,
        width: 100,
        height: 100,
        fill: '#3B82F6',
        stroke: '#1E40AF',
        strokeWidth: 2,
        text: selectedTool === 'text' ? 'Text' : undefined,
        fontSize: selectedTool === 'text' ? 16 : undefined,
        selected: false
      };
      setElements(prev => [...prev, newElement]);
      setSelectedTool('select');
    }
  };

  const handleElementSelect = (elementId: string) => {
    setElements(prev => prev.map(el => ({
      ...el,
      selected: el.id === elementId
    })));
  };

  const selectedElement = elements.find(el => el.selected);

  return (
    <div className="h-screen bg-figma-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-figma-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-figma-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-semibold text-figma-gray-900">
            {currentProject?.name || 'Untitled'}
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-figma-gray-100 rounded-lg transition-colors">
            <Undo className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-figma-gray-100 rounded-lg transition-colors">
            <Redo className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-figma-gray-300 mx-2"></div>
          <button
            onClick={() => navigate(`/prototype/${projectId}`)}
            className="flex items-center space-x-2 bg-figma-purple text-white px-3 py-2 rounded-lg hover:bg-figma-purple/90 transition-colors"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm font-medium">Play</span>
          </button>
          <button
            onClick={() => navigate(`/collaboration/${projectId}`)}
            className="p-2 hover:bg-figma-gray-100 rounded-lg transition-colors"
          >
            <Users className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-figma-gray-100 rounded-lg transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex">
        {/* Tool Panel */}
        <div className="w-16 bg-white border-r border-figma-gray-200 flex flex-col items-center py-4 space-y-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolSelect(tool.id)}
              className={`p-3 rounded-lg transition-colors ${
                selectedTool === tool.id
                  ? 'bg-figma-purple text-white'
                  : 'text-figma-gray-600 hover:bg-figma-gray-100'
              }`}
              title={tool.label}
            >
              <tool.icon className="w-5 h-5" />
            </button>
          ))}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative overflow-hidden">
          <Canvas
            elements={elements}
            zoom={zoom}
            offset={canvasOffset}
            onElementClick={handleElementSelect}
            onCanvasClick={handleCanvasClick}
          />

          {/* Zoom Controls */}
          <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-white rounded-lg shadow-lg p-2">
            <button
              onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}
              className="p-2 hover:bg-figma-gray-100 rounded-lg transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium px-2">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(Math.min(5, zoom + 0.1))}
              className="p-2 hover:bg-figma-gray-100 rounded-lg transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Side Panels */}
        <div className="flex">
          {/* Layers Panel */}
          <motion.div
            initial={false}
            animate={{ width: showLayers ? 280 : 0 }}
            className="bg-white border-l border-figma-gray-200 overflow-hidden"
          >
            <LayerPanel
              elements={elements}
              onElementSelect={handleElementSelect}
              onElementUpdate={(id, updates) => {
                setElements(prev => prev.map(el => 
                  el.id === id ? { ...el, ...updates } : el
                ));
              }}
            />
          </motion.div>

          {/* Properties Panel */}
          <motion.div
            initial={false}
            animate={{ width: showProperties ? 280 : 0 }}
            className="bg-white border-l border-figma-gray-200 overflow-hidden"
          >
            {selectedElement && (
              <PropertyPanel
                element={selectedElement}
                onUpdate={(updates) => {
                  setElements(prev => prev.map(el => 
                    el.id === selectedElement.id ? { ...el, ...updates } : el
                  ));
                }}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile Bottom Toolbar */}
      <div className="md:hidden bg-white border-t border-figma-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowLayers(!showLayers)}
            className={`p-2 rounded-lg transition-colors ${
              showLayers ? 'bg-figma-purple text-white' : 'text-figma-gray-600 hover:bg-figma-gray-100'
            }`}
          >
            <Layers className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowProperties(!showProperties)}
            className={`p-2 rounded-lg transition-colors ${
              showProperties ? 'bg-figma-purple text-white' : 'text-figma-gray-600 hover:bg-figma-gray-100'
            }`}
          >
            <Palette className="w-5 h-5" />
          </button>
          <button className="p-2 text-figma-gray-600 hover:bg-figma-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 text-figma-gray-600 hover:bg-figma-gray-100 rounded-lg transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorScreen;