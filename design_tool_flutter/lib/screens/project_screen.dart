import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/project_provider.dart';
import '../components/bottom_navigation.dart';
import '../components/project_card.dart';
import '../components/create_project_modal.dart';

class ProjectScreen extends StatefulWidget {
  const ProjectScreen({super.key});

  @override
  State<ProjectScreen> createState() => _ProjectScreenState();
}

class _ProjectScreenState extends State<ProjectScreen> {
  String _searchQuery = '';
  bool _isGridView = true;
  String _sortBy = 'recent'; // 'recent', 'name', 'type'

  List<Project> _sortProjects(List<Project> projects) {
    switch (_sortBy) {
      case 'name':
        return List.from(projects)..sort((a, b) => a.name.compareTo(b.name));
      case 'type':
        return List.from(projects)..sort((a, b) => a.type.compareTo(b.type));
      case 'recent':
      default:
        return projects; // Assuming projects are already sorted by recent
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[50],
      appBar: AppBar(
        title: const Text(
          'Projects',
          style: TextStyle(
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          PopupMenuButton<String>(
            icon: const Icon(Icons.sort),
            onSelected: (value) {
              setState(() {
                _sortBy = value;
              });
            },
            itemBuilder: (context) => [
              const PopupMenuItem(
                value: 'recent',
                child: Text('Sort by Recent'),
              ),
              const PopupMenuItem(
                value: 'name',
                child: Text('Sort by Name'),
              ),
              const PopupMenuItem(
                value: 'type',
                child: Text('Sort by Type'),
              ),
            ],
          ),
          IconButton(
            icon: Icon(_isGridView ? Icons.view_list : Icons.grid_view),
            onPressed: () {
              setState(() {
                _isGridView = !_isGridView;
              });
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // Search Bar
          Padding(
            padding: const EdgeInsets.all(16),
            child: TextField(
              onChanged: (value) => setState(() => _searchQuery = value),
              decoration: InputDecoration(
                hintText: 'Search projects...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide.none,
                ),
                filled: true,
                fillColor: Colors.white,
              ),
            ),
          ),

          // Project Categories
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                _CategoryChip(
                  label: 'All Projects',
                  icon: Icons.folder_outlined,
                  isSelected: true,
                  onTap: () {
                    // TODO: Filter by all projects
                  },
                ),
                _CategoryChip(
                  label: 'Design Files',
                  icon: Icons.edit_document,
                  isSelected: false,
                  onTap: () {
                    // TODO: Filter by design files
                  },
                ),
                _CategoryChip(
                  label: 'Prototypes',
                  icon: Icons.bolt,
                  isSelected: false,
                  onTap: () {
                    // TODO: Filter by prototypes
                  },
                ),
                _CategoryChip(
                  label: 'Whiteboards',
                  icon: Icons.dashboard_customize,
                  isSelected: false,
                  onTap: () {
                    // TODO: Filter by whiteboards
                  },
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Projects Grid/List
          Expanded(
            child: Consumer<ProjectProvider>(
              builder: (context, projectProvider, child) {
                var projects = _sortProjects(projectProvider.projects)
                    .where((project) => project.name
                        .toLowerCase()
                        .contains(_searchQuery.toLowerCase()))
                    .toList();

                if (projects.isEmpty) {
                  return Center(
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
                        const SizedBox(height: 24),
                        ElevatedButton.icon(
                          onPressed: () {
                            showModalBottomSheet(
                              context: context,
                              isScrollControlled: true,
                              backgroundColor: Colors.transparent,
                              builder: (context) => const CreateProjectModal(),
                            );
                          },
                          icon: const Icon(Icons.add),
                          label: const Text('Create Project'),
                        ),
                      ],
                    ),
                  );
                }

                return _isGridView
                    ? GridView.builder(
                        padding: const EdgeInsets.all(16),
                        gridDelegate:
                            const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          crossAxisSpacing: 16,
                          mainAxisSpacing: 16,
                          childAspectRatio: 0.8,
                        ),
                        itemCount: projects.length,
                        itemBuilder: (context, index) {
                          return ProjectCard(
                            project: projects[index],
                            viewMode: 'grid',
                            onTap: () {
                              // TODO: Navigate to project details
                            },
                          );
                        },
                      )
                    : ListView.builder(
                        padding: const EdgeInsets.all(16),
                        itemCount: projects.length,
                        itemBuilder: (context, index) {
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 16),
                            child: ProjectCard(
                              project: projects[index],
                              viewMode: 'list',
                              onTap: () {
                                // TODO: Navigate to project details
                              },
                            ),
                          );
                        },
                      );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showModalBottomSheet(
            context: context,
            isScrollControlled: true,
            backgroundColor: Colors.transparent,
            builder: (context) => const CreateProjectModal(),
          );
        },
        child: const Icon(Icons.add),
      ),
      bottomNavigationBar: const BottomNavigation(currentIndex: 1),
    );
  }
}

class _CategoryChip extends StatelessWidget {
  final String label;
  final IconData icon;
  final bool isSelected;
  final VoidCallback onTap;

  const _CategoryChip({
    required this.label,
    required this.icon,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: FilterChip(
        selected: isSelected,
        showCheckmark: false,
        avatar: Icon(
          icon,
          size: 18,
          color: isSelected ? Colors.white : Colors.grey[600],
        ),
        label: Text(label),
        labelStyle: TextStyle(
          color: isSelected ? Colors.white : Colors.grey[600],
          fontWeight: FontWeight.w500,
        ),
        backgroundColor: Colors.white,
        selectedColor: Theme.of(context).primaryColor,
        onSelected: (_) => onTap(),
      ),
    );
  }
}
