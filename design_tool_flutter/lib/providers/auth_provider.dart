import 'package:flutter/material.dart';

class AuthProvider extends ChangeNotifier {
  Map<String, dynamic>? _user;
  bool _isLoading = false;
  String? _error;

  // Getters
  Map<String, dynamic>? get user => _user;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _user != null;

  // Login method
  Future<void> login(String username, String password) async {
    if (username.isEmpty || password.isEmpty) {
      _error = 'Username and password are required';
      notifyListeners();
      return;
    }

    try {
      _isLoading = true;
      _error = null;
      notifyListeners();

      // Simulate API call
      await Future.delayed(const Duration(seconds: 2));

      // Simulate successful login
      _user = {
        'id': '1',
        'name': username,
        'email': '$username@example.com',
        'avatar': 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      };

      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _isLoading = false;
      _error = e.toString();
      notifyListeners();
      throw e;
    }
  }

  // Logout method
  Future<void> logout() async {
    try {
      _isLoading = true;
      notifyListeners();

      // Simulate API call
      await Future.delayed(const Duration(seconds: 1));

      _user = null;
      _isLoading = false;
      _error = null;
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
