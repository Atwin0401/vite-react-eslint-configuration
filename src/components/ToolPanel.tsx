import React from 'react';
import { Move, Square, Circle, Type, Pen, Image } from 'lucide-react';

interface Tool {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
}

interface ToolPanelProps {
  selectedTool: string;
  onToolSelect: (toolId: string) => void;
}

const ToolPanel: React.FC<ToolPanelProps> = ({ selectedTool, onToolSelect }) => {
  const tools: Tool[] = [
    { id: 'select', icon: Move, label: 'Select' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'pen', icon: Pen, label: 'Pen' },
    { id: 'image', icon: Image, label: 'Image' },
  ];

  return (
    <div className="w-16 bg-white border-r border-figma-gray-200 flex flex-col items-center py-4 space-y-2">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onToolSelect(tool.id)}
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
  );
};

export default ToolPanel;