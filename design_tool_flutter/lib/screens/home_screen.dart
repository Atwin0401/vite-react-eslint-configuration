import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../providers/project_provider.dart';
import '../components/bottom_navigation.dart';
import '../components/project_card.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String _searchQuery = '';
  String _filterBy = 'all'; // 'all', 'recent', 'shared', 'starred'
  bool _isGridView = true;

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<AuthProvider>(context).user;
    final projects = Provider.of<ProjectProvider>(context).projects;

    // Filter projects based on search and filter criteria
    final filteredProjects = projects.where((project) {
      final matchesSearch = project.name.toLowerCase().contains(_searchQuery.toLowerCase());
      switch (_filterBy) {
        case 'shared':
          return matchesSearch && project.isShared;
        case 'recent':
          return matchesSearch && project.lastModified.contains('Just now');
        default:
          return matchesSearch;
      }
    }).toList();

    return Scaffold(
      backgroundColor: Colors.grey[50],
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Container(
              padding: const EdgeInsets.all(16),
              color: Colors.white,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // User Info
                  Row(
                    children: [
                      CircleAvatar(
                        radius: 20,
                        backgroundImage: NetworkImage(user?['avatar'] ?? ''),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Good morning, ${user?['name']?.split(' ')[0] ?? 'User'}',
                              style: const TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(
                              'Ready to create something amazing?',
                              style: TextStyle(
                                color: Colors.grey[600],
                                fontSize: 14,
                              ),
                            ),
                          ],
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.notifications_outlined),
                        onPressed: () {
                          // TODO: Navigate to notifications
                        },
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Search Bar
                  TextField(
                    onChanged: (value) => setState(() => _searchQuery = value),
                    decoration: InputDecoration(
                      hintText: 'Search projects...',
                      prefixIcon: const Icon(Icons.search),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide.none,
                      ),
                      filled: true,
                      fillColor: Colors.grey[100],
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Quick Actions
                  SizedBox(
                    height: 100,
                    child: Row(
                      children: [
                        _QuickActionButton(
                          icon: Icons.edit_document,
                          label: 'Design File',
                          onTap: () {
                            // TODO: Create design file
                          },
                        ),
                        _QuickActionButton(
                          icon: Icons.bolt,
                          label: 'Prototype',
                          onTap: () {
                            // TODO: Create prototype
                          },
                        ),
                        _QuickActionButton(
                          icon: Icons.dashboard_customize,
                          label: 'Whiteboard',
                          onTap: () {
                            // TODO: Create whiteboard
                          },
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Filter Tabs
                  Row(
                    children: [
                      Expanded(
                        child: SingleChildScrollView(
                          scrollDirection: Axis.horizontal,
                          child: Row(
                            children: [
                              _FilterTab(
                                label: 'All',
                                isSelected: _filterBy == 'all',
                                onTap: () => setState(() => _filterBy = 'all'),
                              ),
                              _FilterTab(
                                label: 'Recent',
                                isSelected: _filterBy == 'recent',
                                onTap: () => setState(() => _filterBy = 'recent'),
                              ),
                              _FilterTab(
                                label: 'Shared',
                                isSelected: _filterBy == 'shared',
                                onTap: () => setState(() => _filterBy = 'shared'),
                              ),
                            ],
                          ),
                        ),
                      ),
                      IconButton(
                        icon: Icon(_isGridView ? Icons.view_list : Icons.grid_view),
                        onPressed: () => setState(() => _isGridView = !_isGridView),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            // Projects List/Grid
            Expanded(
              child: filteredProjects.isEmpty
                  ? Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            Icons.folder_open,
                            size: 64,
                            color: Colors.grey[400],
                          ),
                          const SizedBox(height: 16),
                          Text(
                            'No projects found',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: Colors.grey[800],
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            _searchQuery.isNotEmpty
                                ? 'Try adjusting your search'
                                : 'Create your first project',
                            style: TextStyle(
                              color: Colors.grey[600],
                            ),
                          ),
                        ],
                      ),
                    )
                  : _isGridView
                      ? GridView.builder(
                          padding: const EdgeInsets.all(16),
                          gridDelegate:
                              const SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 2,
                            crossAxisSpacing: 16,
                            mainAxisSpacing: 16,
                            childAspectRatio: 0.8,
                          ),
                          itemCount: filteredProjects.length,
                          itemBuilder: (context, index) {
                            final project = filteredProjects[index];
                            return ProjectCard(
                              project: project,
                              viewMode: 'grid',
                              onTap: () {
                                // TODO: Navigate to project
                              },
                              onShare: () {
                                // TODO: Share project
                              },
                              onDelete: () {
                                // TODO: Delete project
                              },
                            );
                          },
                        )
                      : ListView.builder(
                          padding: const EdgeInsets.all(16),
                          itemCount: filteredProjects.length,
                          itemBuilder: (context, index) {
                            final project = filteredProjects[index];
                            return Padding(
                              padding: const EdgeInsets.only(bottom: 16),
                              child: ProjectCard(
                                project: project,
                                viewMode: 'list',
                                onTap: () {
                                  // TODO: Navigate to project
                                },
                                onShare: () {
                                  // TODO: Share project
                                },
                                onDelete: () {
                                  // TODO: Delete project
                                },
                              ),
                            );
                          },
                        ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const BottomNavigation(currentIndex: 0),
    );
  }
}

class _QuickActionButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;

  const _QuickActionButton({
    required this.icon,
    required this.label,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 4),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(12),
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.grey[100],
              borderRadius: BorderRadius.circular(12),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  icon,
                  color: Theme.of(context).primaryColor,
                  size: 28,
                ),
                const SizedBox(height: 8),
                Text(
                  label,
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _FilterTab extends StatelessWidget {
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const _FilterTab({
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(20),
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: BoxDecoration(
            color: isSelected ? Theme.of(context).primaryColor : Colors.transparent,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: isSelected ? Theme.of(context).primaryColor : Colors.grey[300]!,
            ),
          ),
          child: Text(
            label,
            style: TextStyle(
              color: isSelected ? Colors.white : Colors.grey[600],
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
      ),
    );
  }
}
