# Design Tool Flutter

A modern design tool built with Flutter, featuring a clean and intuitive interface for creating, managing, and collaborating on design projects.

## Features

- **Authentication System**
  - User login/logout functionality
  - Profile management
  - Secure authentication state management

- **Project Management**
  - Create new projects (Design Files, Prototypes, Whiteboards)
  - Grid and List view options
  - Search and filter projects
  - Sort projects by name, type, or recent
  - Project sharing capabilities

- **Design Editor**
  - Interactive canvas with zoom and pan controls
  - Basic shape tools (Rectangle, Circle)
  - Text tool
  - Layer management
  - Property panel for element customization
  - Undo/Redo functionality
  - Project auto-saving

- **Modern UI/UX**
  - Clean, minimalist design
  - Responsive layout
  - Smooth animations and transitions
  - Intuitive navigation
  - Dark/Light theme support (coming soon)

## Project Structure

```
lib/
├── components/           # Reusable UI components
│   ├── bottom_navigation.dart
│   ├── create_project_modal.dart
│   └── project_card.dart
├── providers/           # State management
│   ├── auth_provider.dart
│   └── project_provider.dart
├── screens/            # Application screens
│   ├── splash_screen.dart
│   ├── login_screen.dart
│   ├── home_screen.dart
│   ├── project_screen.dart
│   ├── editor_screen.dart
│   └── profile_screen.dart
├── utils/             # Utility functions and constants
│   └── app_routes.dart
└── main.dart          # Application entry point
```

## Getting Started

1. **Prerequisites**
   - Flutter SDK (latest stable version)
   - Dart SDK
   - Android Studio / VS Code with Flutter extensions

2. **Installation**
   ```bash
   # Clone the repository
   git clone https://github.com/yourusername/design_tool_flutter.git

   # Navigate to project directory
   cd design_tool_flutter

   # Install dependencies
   flutter pub get

   # Run the app
   flutter run
   ```

## Dependencies

- `provider`: State management
- `google_fonts`: Typography
- `http`: API communication
- `animations`: UI animations
- `font_awesome_flutter`: Icons

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Flutter team for the amazing framework
- The open-source community for inspiration and resources
