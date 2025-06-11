import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

interface CanvasProps {
  elements: CanvasElement[];
  zoom: number;
  offset: { x: number; y: number };
  onElementClick: (elementId: string) => void;
  onCanvasClick: (x: number, y: number) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  elements,
  zoom,
  offset,
  onElementClick,
  onCanvasClick
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left - offset.x) / zoom;
    const y = (e.clientY - rect.top - offset.y) / zoom;

    // Check if clicking on an element
    const clickedElement = elements.find(el => 
      x >= el.x && x <= el.x + el.width &&
      y >= el.y && y <= el.y + el.height
    );

    if (clickedElement) {
      onElementClick(clickedElement.id);
    } else {
      onCanvasClick(x, y);
      // Deselect all elements
      elements.forEach(el => el.selected = false);
    }
  };

  const renderElement = (element: CanvasElement) => {
    const commonProps = {
      key: element.id,
      style: {
        position: 'absolute' as const,
        left: element.x * zoom + offset.x,
        top: element.y * zoom + offset.y,
        width: element.width * zoom,
        height: element.height * zoom,
        cursor: 'pointer'
      },
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        onElementClick(element.id);
      }
    };

    switch (element.type) {
      case 'rectangle':
        return (
          <div
            {...commonProps}
            style={{
              ...commonProps.style,
              backgroundColor: element.fill,
              border: `${element.strokeWidth}px solid ${element.stroke}`,
              borderRadius: '4px'
            }}
            className={element.selected ? 'ring-2 ring-figma-purple' : ''}
          />
        );

      case 'circle':
        return (
          <div
            {...commonProps}
            style={{
              ...commonProps.style,
              backgroundColor: element.fill,
              border: `${element.strokeWidth}px solid ${element.stroke}`,
              borderRadius: '50%'
            }}
            className={element.selected ? 'ring-2 ring-figma-purple' : ''}
          />
        );

      case 'text':
        return (
          <div
            {...commonProps}
            style={{
              ...commonProps.style,
              color: element.fill,
              fontSize: (element.fontSize || 16) * zoom,
              fontFamily: 'Inter, sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: element.selected ? '2px solid #8B5CF6' : 'none',
              outline: 'none'
            }}
            contentEditable={element.selected}
            suppressContentEditableWarning
          >
            {element.text}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={canvasRef}
      className="w-full h-full bg-figma-gray-50 relative overflow-hidden cursor-crosshair"
      onMouseDown={handleCanvasMouseDown}
      style={{
        backgroundImage: `
          radial-gradient(circle, #e5e7eb 1px, transparent 1px)
        `,
        backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
        backgroundPosition: `${offset.x}px ${offset.y}px`
      }}
    >
      {/* Canvas Elements */}
      {elements.map(renderElement)}

      {/* Selection Indicator */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg px-3 py-2 text-sm text-figma-gray-600">
        {elements.length} elements
      </div>
    </div>
  );
};

export default Canvas;