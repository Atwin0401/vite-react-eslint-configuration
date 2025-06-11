import 'package:flutter/material.dart';

class PrototypeScreen extends StatelessWidget {
  const PrototypeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Prototype'),
      ),
      body: const Center(
        child: Text('Prototype Screen'),
      ),
    );
  }
}
