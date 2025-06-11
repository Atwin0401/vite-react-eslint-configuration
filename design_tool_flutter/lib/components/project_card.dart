import 'package:flutter/material.dart';
import '../providers/project_provider.dart';

class ProjectCard extends StatelessWidget {
  final Project project;
  final String viewMode; // 'grid' or 'list'
  final VoidCallback onTap;
  final VoidCallback? onShare;
  final VoidCallback? onDelete;

  const ProjectCard({
    super.key,
    required this.project,
    required this.viewMode,
    required this.onTap,
    this.onShare,
    this.onDelete,
  });

  Color _getTypeColor() {
    switch (project.type) {
      case 'design':
        return const Color(0xFF3B82F6); // Tailwind Blue-500
      case 'prototype':
        return const Color(0xFF10B981); // Tailwind Green-500
      case 'whiteboard':
        return const Color(0xFFF59E0B); // Tailwind Amber-500
      default:
        return Colors.grey;
    }
  }

  String _getTypeLabel() {
    switch (project.type) {
      case 'design':
        return 'Design';
      case 'prototype':
        return 'Prototype';
      case 'whiteboard':
        return 'Whiteboard';
      default:
        return 'Unknown';
    }
  }

  @override
  Widget build(BuildContext context) {
    if (viewMode == 'list') {
      return _ListViewCard(
        project: project,
        typeColor: _getTypeColor(),
        typeLabel: _getTypeLabel(),
        onTap: onTap,
        onShare: onShare,
        onDelete: onDelete,
      );
    }

    return _GridViewCard(
      project: project,
      typeColor: _getTypeColor(),
      typeLabel: _getTypeLabel(),
      onTap: onTap,
      onShare: onShare,
      onDelete: onDelete,
    );
  }
}

class _GridViewCard extends StatelessWidget {
  final Project project;
  final Color typeColor;
  final String typeLabel;
  final VoidCallback onTap;
  final VoidCallback? onShare;
  final VoidCallback? onDelete;

  const _GridViewCard({
    required this.project,
    required this.typeColor,
    required this.typeLabel,
    required this.onTap,
    this.onShare,
    this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          decoration: BoxDecoration(
            color: const Color(0xFFF9FAFB), // Tailwind Gray-50
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.03),
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Thumbnail Section
              Stack(
                children: [
                  ClipRRect(
                    borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
                    child: Image.network(
                      project.thumbnail,
                      height: 140,
                      width: double.infinity,
                      fit: BoxFit.cover,
                    ),
                  ),
                  Positioned(
                    top: 12,
                    left: 12,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: typeColor.withOpacity(0.15),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        typeLabel,
                        style: TextStyle(
                          color: typeColor,
                          fontWeight: FontWeight.w600,
                          fontSize: 12,
                          letterSpacing: 0.5,
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    top: 12,
                    right: 12,
                    child: _ProjectMenu(
                      onShare: onShare,
                      onDelete: onDelete,
                    ),
                  ),
                ],
              ),
              // Project Info Section
              Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      project.name,
                      style: textTheme.headline6?.copyWith(
                        fontWeight: FontWeight.bold,
                        color: const Color(0xFF111827), // Tailwind Gray-900
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 8),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            const Icon(
                              Icons.access_time,
                              size: 16,
                              color: Color(0xFF6B7280), // Tailwind Gray-500
                            ),
                            const SizedBox(width: 6),
                            Text(
                              project.lastModified,
                              style: textTheme.bodyText2?.copyWith(
                                color: const Color(0xFF6B7280),
                                fontSize: 13,
                              ),
                            ),
                          ],
                        ),
                        if (project.collaborators.isNotEmpty)
                          Row(
                            children: [
                              const Icon(
                                Icons.group,
                                size: 16,
                                color: Color(0xFF6B7280),
                              ),
                              const SizedBox(width: 6),
                              Text(
                                project.collaborators.length.toString(),
                                style: textTheme.bodyText2?.copyWith(
                                  color: const Color(0xFF6B7280),
                                  fontSize: 13,
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
      ),
    );
  }
}

class _ListViewCard extends StatelessWidget {
  final Project project;
  final Color typeColor;
  final String typeLabel;
  final VoidCallback onTap;
  final VoidCallback? onShare;
  final VoidCallback? onDelete;

  const _ListViewCard({
    required this.project,
    required this.typeColor,
    required this.typeLabel,
    required this.onTap,
    this.onShare,
    this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          margin: const EdgeInsets.symmetric(vertical: 6),
          decoration: BoxDecoration(
            color: const Color(0xFFF9FAFB),
            borderRadius: BorderRadius.circular(16),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.03),
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                // Thumbnail
                ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Image.network(
                    project.thumbnail,
                    width: 64,
                    height: 64,
                    fit: BoxFit.cover,
                  ),
                ),
                const SizedBox(width: 16),
                // Project Info
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: typeColor.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Text(
                              typeLabel,
                              style: TextStyle(
                                color: typeColor,
                                fontWeight: FontWeight.w600,
                                fontSize: 12,
                                letterSpacing: 0.5,
                              ),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Text(
                              project.name,
                              style: textTheme.headline6?.copyWith(
                                fontWeight: FontWeight.bold,
                                color: const Color(0xFF111827),
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Row(
                        children: [
                          const Icon(
                            Icons.access_time,
                            size: 16,
                            color: Color(0xFF6B7280),
                          ),
                          const SizedBox(width: 6),
                          Text(
                            project.lastModified,
                            style: textTheme.bodyText2?.copyWith(
                              color: const Color(0xFF6B7280),
                              fontSize: 13,
                            ),
                          ),
                          if (project.collaborators.isNotEmpty) ...[
                            const SizedBox(width: 16),
                            const Icon(
                              Icons.group,
                              size: 16,
                              color: Color(0xFF6B7280),
                            ),
                            const SizedBox(width: 6),
                            Text(
                              project.collaborators.length.toString(),
                              style: textTheme.bodyText2?.copyWith(
                                color: const Color(0xFF6B7280),
                                fontSize: 13,
                              ),
                            ),
                          ],
                        ],
                      ),
                    ],
                  ),
                ),
                // Menu
                _ProjectMenu(
                  onShare: onShare,
                  onDelete: onDelete,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _ProjectMenu extends StatelessWidget {
  final VoidCallback? onShare;
  final VoidCallback? onDelete;

  const _ProjectMenu({
    this.onShare,
    this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return PopupMenuButton<String>(
      icon: const Icon(
        Icons.more_vert,
        color: Color(0xFF6B7280),
      ),
      itemBuilder: (context) => [
        if (onShare != null)
          const PopupMenuItem(
            value: 'share',
            child: Row(
              children: [
                Icon(Icons.share, size: 20),
                SizedBox(width: 8),
                Text('Share'),
              ],
            ),
          ),
        if (onDelete != null)
          const PopupMenuItem(
            value: 'delete',
            child: Row(
              children: [
                Icon(Icons.delete, size: 20),
                SizedBox(width: 8),
                Text('Delete'),
              ],
            ),
          ),
      ],
      onSelected: (value) {
        switch (value) {
          case 'share':
            onShare?.call();
            break;
          case 'delete':
            onDelete?.call();
            break;
        }
      },
    );
  }
}
</create_file>
