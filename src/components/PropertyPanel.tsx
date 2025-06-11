import React from 'react';
import { Palette, Type, Move, RotateCw } from 'lucide-react';

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

interface PropertyPanelProps {
  element: CanvasElement;
  onUpdate: (updates: Partial<CanvasElement>) => void;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({ element, onUpdate }) => {
  const colorPresets = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444',
    '#6B7280', '#1F2937', '#FFFFFF', '#000000'
  ];

  return (
    <div className="w-full h-full bg-white">
      <div className="p-4 border-b border-figma-gray-200">
        <h3 className="font-semibold text-figma-gray-900">Properties</h3>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Position & Size */}
        <div className="property-group pb-4">
          <div className="flex items-center space-x-2 mb-3">
            <Move className="w-4 h-4 text-figma-gray-600" />
            <h4 className="font-medium text-figma-gray-900">Position & Size</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-figma-gray-600 mb-1">X</label>
              <input
                type="number"
                value={Math.round(element.x)}
                onChange={(e) => onUpdate({ x: parseInt(e.target.value) || 0 })}
                className="w-full px-2 py-1 text-sm border border-figma-gray-300 rounded focus:ring-1 focus:ring-figma-purple focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-figma-gray-600 mb-1">Y</label>
              <input
                type="number"
                value={Math.round(element.y)}
                onChange={(e) => onUpdate({ y: parseInt(e.target.value) || 0 })}
                className="w-full px-2 py-1 text-sm border border-figma-gray-300 rounded focus:ring-1 focus:ring-figma-purple focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-figma-gray-600 mb-1">W</label>
              <input
                type="number"
                value={Math.round(element.width)}
                onChange={(e) => onUpdate({ width: parseInt(e.target.value) || 1 })}
                className="w-full px-2 py-1 text-sm border border-figma-gray-300 rounded focus:ring-1 focus:ring-figma-purple focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-figma-gray-600 mb-1">H</label>
              <input
                type="number"
                value={Math.round(element.height)}
                onChange={(e) => onUpdate({ height: parseInt(e.target.value) || 1 })}
                className="w-full px-2 py-1 text-sm border border-figma-gray-300 rounded focus:ring-1 focus:ring-figma-purple focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Fill Color */}
        <div className="property-group pb-4">
          <div className="flex items-center space-x-2 mb-3">
            <Palette className="w-4 h-4 text-figma-gray-600" />
            <h4 className="font-medium text-figma-gray-900">Fill</h4>
          </div>
          
          <div className="flex items-center space-x-2 mb-3">
            <div
              className="w-8 h-8 rounded border border-figma-gray-300"
              style={{ backgroundColor: element.fill }}
            />
            <input
              type="text"
              value={element.fill}
              onChange={(e) => onUpdate({ fill: e.target.value })}
              className="flex-1 px-2 py-1 text-sm border border-figma-gray-300 rounded focus:ring-1 focus:ring-figma-purple focus:border-transparent"
            />
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {colorPresets.map((color) => (
              <button
                key={color}
                onClick={() => onUpdate({ fill: color })}
                className="w-8 h-8 rounded border border-figma-gray-300 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Stroke */}
        <div className="property-group pb-4">
          <h4 className="font-medium text-figma-gray-900 mb-3">Stroke</h4>
          
          <div className="flex items-center space-x-2 mb-3">
            <div
              className="w-8 h-8 rounded border-2"
              style={{ borderColor: element.stroke }}
            />
            <input
              type="text"
              value={element.stroke}
              onChange={(e) => onUpdate({ stroke: e.target.value })}
              className="flex-1 px-2 py-1 text-sm border border-figma-gray-300 rounded focus:ring-1 focus:ring-figma-purple focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-figma-gray-600 mb-1">Width</label>
            <input
              type="number"
              min="0"
              value={element.strokeWidth}
              onChange={(e) => onUpdate({ strokeWidth: parseInt(e.target.value) || 0 })}
              className="w-full px-2 py-1 text-sm border border-figma-gray-300 rounded focus:ring-1 focus:ring-figma-purple focus:border-transparent"
            />
          </div>
        </div>

        {/* Text Properties */}
        {element.type === 'text' && (
          <div className="property-group pb-4">
            <div className="flex items-center space-x-2 mb-3">
              <Type className="w-4 h-4 text-figma-gray-600" />
              <h4 className="font-medium text-figma-gray-900">Text</h4>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-figma-gray-600 mb-1">Content</label>
                <input
                  type="text"
                  value={element.text || ''}
                  onChange={(e) => onUpdate({ text: e.target.value })}
                  className="w-full px-2 py-1 text-sm border border-figma-gray-300 rounded focus:ring-1 focus:ring-figma-purple focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-figma-gray-600 mb-1">Font Size</label>
                <input
                  type="number"
                  min="8"
                  max="72"
                  value={element.fontSize || 16}
                  onChange={(e) => onUpdate({ fontSize: parseInt(e.target.value) || 16 })}
                  className="w-full px-2 py-1 text-sm border border-figma-gray-300 rounded focus:ring-1 focus:ring-figma-purple focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyPanel;