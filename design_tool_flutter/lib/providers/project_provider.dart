import 'package:flutter/material.dart';

class Project {
  final String id;
  final String name;
  final String thumbnail;
  final String lastModified;
  final List<String> collaborators;
  final bool isShared;
  final String type; // 'design', 'prototype', or 'whiteboard'

  Project({
    required this.id,
    required this.name,
    required this.thumbnail,
    required this.lastModified,
    required this.collaborators,
    required this.isShared,
    required this.type,
  });
}

class ProjectProvider extends ChangeNotifier {
  final List<Project> _projects = [];
  bool _isLoading = false;
  String? _error;

  // Getters
  List<Project> get projects => [..._projects];
  bool get isLoading => _isLoading;
  String? get error => _error;

  // Add project
  Future<void> addProject(String name, String type) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();

      // Simulate API call
      await Future.delayed(const Duration(seconds: 1));

      final newProject = Project(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        name: name,
        thumbnail: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
        lastModified: 'Just now',
        collaborators: [],
        isShared: false,
        type: type,
      );

      _projects.add(newProject);
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _isLoading = false;
      _error = e.toString();
      notifyListeners();
      throw e;
    }
  }

  // Delete project
  Future<void> deleteProject(String id) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();

      // Simulate API call
      await Future.delayed(const Duration(seconds: 1));

      _projects.removeWhere((project) => project.id == id);
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _isLoading = false;
      _error = e.toString();
      notifyListeners();
      throw e;
    }
  }

  // Update project
  Future<void> updateProject(String id, String name) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();

      // Simulate API call
      await Future.delayed(const Duration(seconds: 1));

      final index = _projects.indexWhere((project) => project.id == id);
      if (index != -1) {
        final oldProject = _projects[index];
        _projects[index] = Project(
          id: oldProject.id,
          name: name,
          thumbnail: oldProject.thumbnail,
          lastModified: 'Just now',
          collaborators: oldProject.collaborators,
          isShared: oldProject.isShared,
          type: oldProject.type,
        );
      }

      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _isLoading = false;
      _error = e.toString();
      notifyListeners();
      throw e;
    }
  }

  // Share project
  Future<void> toggleProjectShare(String id) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();

      // Simulate API call
      await Future.delayed(const Duration(seconds: 1));

      final index = _projects.indexWhere((project) => project.id == id);
      if (index != -1) {
        final oldProject = _projects[index];
        _projects[index] = Project(
          id: oldProject.id,
          name: oldProject.name,
          thumbnail: oldProject.thumbnail,
          lastModified: oldProject.lastModified,
          collaborators: oldProject.collaborators,
          isShared: !oldProject.isShared,
          type: oldProject.type,
        );
      }

      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _isLoading = false;
      _error = e.toString();
      notifyListeners();
      throw e;
    }
  }

  // Clear error
  void clearError() {
    _error = null;
    notifyListeners();
  }
}
