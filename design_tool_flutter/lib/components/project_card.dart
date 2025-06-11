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
        return Colors.blue;
      case 'prototype':
        return Colors.green;
      case 'whiteboard':
        return Colors.orange;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    if (viewMode == 'list') {
      return _ListViewCard(
        project: project,
        typeColor: _getTypeColor(),
        onTap: onTap,
        onShare: onShare,
        onDelete: onDelete,
      );
    }

    return _GridViewCard(
      project: project,
      typeColor: _getTypeColor(),
      onTap: onTap,
      onShare: onShare,
      onDelete: onDelete,
    );
  }
}

class _GridViewCard extends StatelessWidget {
  final Project project;
  final Color typeColor;
  final VoidCallback onTap;
  final VoidCallback? onShare;
  final VoidCallback? onDelete;

  const _GridViewCard({
    required this.project,
    required this.typeColor,
    required this.onTap,
    this.onShare,
    this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
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
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
                  child: Image.network(
                    project.thumbnail,
                    height: 120,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                ),
                Positioned(
                  top: 8,
                  left: 8,
                  child: Container(
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      color: typeColor,
                      shape: BoxShape.circle,
                    ),
                  ),
                ),
                Positioned(
                  top: 8,
                  right: 8,
                  child: _ProjectMenu(
                    onShare: onShare,
                    onDelete: onDelete,
                  ),
                ),
              ],
            ),
            // Project Info Section
            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    project.name,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
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
                            size: 14,
                            color: Colors.grey,
                          ),
                          const SizedBox(width: 4),
                          Text(
                            project.lastModified,
                            style: const TextStyle(
                              color: Colors.grey,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                      if (project.collaborators.isNotEmpty)
                        Row(
                          children: [
                            const Icon(
                              Icons.group,
                              size: 14,
                              color: Colors.grey,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              project.collaborators.length.toString(),
                              style: const TextStyle(
                                color: Colors.grey,
                                fontSize: 12,
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
    );
  }
}

class _ListViewCard extends StatelessWidget {
  final Project project;
  final Color typeColor;
  final VoidCallback onTap;
  final VoidCallback? onShare;
  final VoidCallback? onDelete;

  const _ListViewCard({
    required this.project,
    required this.typeColor,
    required this.onTap,
    this.onShare,
    this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 4),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Row(
            children: [
              // Thumbnail
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.network(
                  project.thumbnail,
                  width: 60,
                  height: 60,
                  fit: BoxFit.cover,
                ),
              ),
              const SizedBox(width: 12),
              // Project Info
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 8,
                          height: 8,
                          decoration: BoxDecoration(
                            color: typeColor,
                            shape: BoxShape.circle,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            project.name,
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        const Icon(
                          Icons.access_time,
                          size: 14,
                          color: Colors.grey,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          project.lastModified,
                          style: const TextStyle(
                            color: Colors.grey,
                            fontSize: 12,
                          ),
                        ),
                        if (project.collaborators.isNotEmpty) ...[
                          const SizedBox(width: 12),
                          const Icon(
                            Icons.group,
                            size: 14,
                            color: Colors.grey,
                          ),
                          const SizedBox(width: 4),
                          Text(
                            project.collaborators.length.toString(),
                            style: const TextStyle(
                              color: Colors.grey,
                              fontSize: 12,
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
        color: Colors.grey,
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
