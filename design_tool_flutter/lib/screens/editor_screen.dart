import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/project_provider.dart';

class EditorScreen extends StatefulWidget {
  const EditorScreen({super.key});

  @override
  State<EditorScreen> createState() => _EditorScreenState();
}

class _EditorScreenState extends State<EditorScreen> {
  double _zoom = 1.0;
  Offset _panOffset = Offset.zero;
  final TransformationController _transformationController = TransformationController();
  String _selectedTool = 'select'; // select, rectangle, circle, text, etc.
  bool _isLayerPanelOpen = true;
  bool _isPropertyPanelOpen = true;

  @override
  void dispose() {
    _transformationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Main Editor Area
          Row(
            children: [
              // Left Panel (Layers)
              if (_isLayerPanelOpen)
                Container(
                  width: 240,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    border: Border(
                      right: BorderSide(color: Colors.grey[200]!),
                    ),
                  ),
                  child: Column(
                    children: [
                      // Layer Panel Header
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          border: Border(
                            bottom: BorderSide(color: Colors.grey[200]!),
                          ),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text(
                              'Layers',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                            IconButton(
                              icon: const Icon(Icons.add),
                              onPressed: () {
                                // TODO: Add new layer
                              },
                            ),
                          ],
                        ),
                      ),
                      // Layer List
                      Expanded(
                        child: ListView(
                          padding: const EdgeInsets.all(8),
                          children: [
                            _LayerItem(
                              name: 'Rectangle 1',
                              type: 'rectangle',
                              isVisible: true,
                              isLocked: false,
                              onVisibilityToggle: () {},
                              onLockToggle: () {},
                            ),
                            _LayerItem(
                              name: 'Text Layer',
                              type: 'text',
                              isVisible: true,
                              isLocked: true,
                              onVisibilityToggle: () {},
                              onLockToggle: () {},
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),

              // Canvas Area
              Expanded(
                child: Stack(
                  children: [
                    // Canvas
                    InteractiveViewer(
                      transformationController: _transformationController,
                      minScale: 0.5,
                      maxScale: 4.0,
                      onInteractionUpdate: (details) {
                        setState(() {
                          _zoom = _transformationController.value.getMaxScaleOnAxis();
                        });
                      },
                      child: Container(
                        color: Colors.grey[100],
                        child: Center(
                          child: Container(
                            width: 800,
                            height: 600,
                            decoration: BoxDecoration(
                              color: Colors.white,
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withOpacity(0.1),
                                  blurRadius: 10,
                                ),
                              ],
                            ),
                            // TODO: Add canvas content
                          ),
                        ),
                      ),
                    ),

                    // Toolbar
                    Positioned(
                      top: 16,
                      left: 0,
                      right: 0,
                      child: Center(
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(8),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.1),
                                blurRadius: 10,
                              ),
                            ],
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              _ToolButton(
                                icon: Icons.mouse,
                                isSelected: _selectedTool == 'select',
                                onPressed: () => setState(() => _selectedTool = 'select'),
                              ),
                              _ToolButton(
                                icon: Icons.rectangle_outlined,
                                isSelected: _selectedTool == 'rectangle',
                                onPressed: () => setState(() => _selectedTool = 'rectangle'),
                              ),
                              _ToolButton(
                                icon: Icons.circle_outlined,
                                isSelected: _selectedTool == 'circle',
                                onPressed: () => setState(() => _selectedTool = 'circle'),
                              ),
                              _ToolButton(
                                icon: Icons.text_fields,
                                isSelected: _selectedTool == 'text',
                                onPressed: () => setState(() => _selectedTool = 'text'),
                              ),
                              const VerticalDivider(indent: 8, endIndent: 8),
                              Text(
                                '${(_zoom * 100).round()}%',
                                style: const TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              // Right Panel (Properties)
              if (_isPropertyPanelOpen)
                Container(
                  width: 240,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    border: Border(
                      left: BorderSide(color: Colors.grey[200]!),
                    ),
                  ),
                  child: Column(
                    children: [
                      // Properties Panel Header
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          border: Border(
                            bottom: BorderSide(color: Colors.grey[200]!),
                          ),
                        ),
                        child: const Row(
                          children: [
                            Text(
                              'Properties',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                          ],
                        ),
                      ),
                      // Properties Content
                      Expanded(
                        child: ListView(
                          padding: const EdgeInsets.all(16),
                          children: [
                            _PropertySection(
                              title: 'Position',
                              children: [
                                Row(
                                  children: [
                                    Expanded(
                                      child: _PropertyField(
                                        label: 'X',
                                        value: '0',
                                      ),
                                    ),
                                    const SizedBox(width: 8),
                                    Expanded(
                                      child: _PropertyField(
                                        label: 'Y',
                                        value: '0',
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                            _PropertySection(
                              title: 'Size',
                              children: [
                                Row(
                                  children: [
                                    Expanded(
                                      child: _PropertyField(
                                        label: 'W',
                                        value: '100',
                                      ),
                                    ),
                                    const SizedBox(width: 8),
                                    Expanded(
                                      child: _PropertyField(
                                        label: 'H',
                                        value: '100',
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
            ],
          ),

          // Top Bar
          Container(
            height: 48,
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border(
                bottom: BorderSide(color: Colors.grey[200]!),
              ),
            ),
            child: Row(
              children: [
                // Back Button
                IconButton(
                  icon: const Icon(Icons.arrow_back),
                  onPressed: () => Navigator.of(context).pop(),
                ),
                const SizedBox(width: 8),
                // Project Title
                const Text(
                  'Untitled Project',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
                const Spacer(),
                // Actions
                IconButton(
                  icon: const Icon(Icons.undo),
                  onPressed: () {
                    // TODO: Implement undo
                  },
                ),
                IconButton(
                  icon: const Icon(Icons.redo),
                  onPressed: () {
                    // TODO: Implement redo
                  },
                ),
                IconButton(
                  icon: const Icon(Icons.save),
                  onPressed: () {
                    // TODO: Implement save
                  },
                ),
                IconButton(
                  icon: const Icon(Icons.share),
                  onPressed: () {
                    // TODO: Implement share
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ToolButton extends StatelessWidget {
  final IconData icon;
  final bool isSelected;
  final VoidCallback onPressed;

  const _ToolButton({
    required this.icon,
    required this.isSelected,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: Icon(
        icon,
        color: isSelected ? Theme.of(context).primaryColor : Colors.grey[600],
      ),
      onPressed: onPressed,
    );
  }
}

class _LayerItem extends StatelessWidget {
  final String name;
  final String type;
  final bool isVisible;
  final bool isLocked;
  final VoidCallback onVisibilityToggle;
  final VoidCallback onLockToggle;

  const _LayerItem({
    required this.name,
    required this.type,
    required this.isVisible,
    required this.isLocked,
    required this.onVisibilityToggle,
    required this.onLockToggle,
  });

  IconData get typeIcon {
    switch (type) {
      case 'rectangle':
        return Icons.rectangle_outlined;
      case 'circle':
        return Icons.circle_outlined;
      case 'text':
        return Icons.text_fields;
      default:
        return Icons.layers;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 4),
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.circular(4),
      ),
      child: ListTile(
        dense: true,
        leading: Icon(typeIcon, size: 20),
        title: Text(
          name,
          style: const TextStyle(fontSize: 14),
        ),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            IconButton(
              icon: Icon(
                isVisible ? Icons.visibility : Icons.visibility_off,
                size: 20,
              ),
              onPressed: onVisibilityToggle,
            ),
            IconButton(
              icon: Icon(
                isLocked ? Icons.lock : Icons.lock_open,
                size: 20,
              ),
              onPressed: onLockToggle,
            ),
          ],
        ),
      ),
    );
  }
}

class _PropertySection extends StatelessWidget {
  final String title;
  final List<Widget> children;

  const _PropertySection({
    required this.title,
    required this.children,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Text(
            title,
            style: const TextStyle(
              fontWeight: FontWeight.w500,
              fontSize: 14,
            ),
          ),
        ),
        ...children,
        const SizedBox(height: 16),
      ],
    );
  }
}

class _PropertyField extends StatelessWidget {
  final String label;
  final String value;

  const _PropertyField({
    required this.label,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            color: Colors.grey[600],
          ),
        ),
        const SizedBox(height: 4),
        TextField(
          controller: TextEditingController(text: value),
          decoration: InputDecoration(
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 8,
              vertical: 8,
            ),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(4),
            ),
          ),
          style: const TextStyle(fontSize: 14),
        ),
      ],
    );
  }
}
