import React from 'react';
import { Eye, EyeOff, Lock, Unlock, MoreVertical } from 'lucide-react';

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

interface LayerPanelProps {
  elements: CanvasElement[];
  onElementSelect: (elementId: string) => void;
  onElementUpdate: (elementId: string, updates: Partial<CanvasElement>) => void;
}

const LayerPanel: React.FC<LayerPanelProps> = ({
  elements,
  onElementSelect,
  onElementUpdate
}) => {
  const getElementName = (element: CanvasElement) => {
    switch (element.type) {
      case 'rectangle':
        return 'Rectangle';
      case 'circle':
        return 'Circle';
      case 'text':
        return element.text || 'Text';
      case 'image':
        return 'Image';
      default:
        return 'Element';
    }
  };

  const getElementIcon = (type: string) => {
    switch (type) {
      case 'rectangle':
        return '⬜';
      case 'circle':
        return '⭕';
      case 'text':
        return '📝';
      case 'image':
        return '🖼️';
      default:
        return '📄';
    }
  };

  return (
    <div className="w-full h-full bg-white">
      <div className="p-4 border-b border-figma-gray-200">
        <h3 className="font-semibold text-figma-gray-900">Layers</h3>
      </div>
      
      <div className="p-2">
        {elements.length === 0 ? (
          <div className="text-center py-8 text-figma-gray-500">
            <p className="text-sm">No layers yet</p>
            <p className="text-xs mt-1">Add elements to see them here</p>
          </div>
        ) : (
          <div className="space-y-1">
            {elements.slice().reverse().map((element) => (
              <div
                key={element.id}
                onClick={() => onElementSelect(element.id)}
                className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                  element.selected
                    ? 'bg-figma-purple/10 border-l-2 border-figma-purple'
                    : 'hover:bg-figma-gray-50'
                }`}
              >
                <span className="text-lg">{getElementIcon(element.type)}</span>
                <span className="flex-1 text-sm font-medium text-figma-gray-900 truncate">
                  {getElementName(element)}
                </span>
                <div className="flex items-center space-x-1">
                  <button className="p-1 hover:bg-figma-gray-200 rounded">
                    <Eye className="w-3 h-3 text-figma-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-figma-gray-200 rounded">
                    <Unlock className="w-3 h-3 text-figma-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-figma-gray-200 rounded">
                    <MoreVertical className="w-3 h-3 text-figma-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LayerPanel;