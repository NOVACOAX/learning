import 'package:flutter/material.dart';

class Sandbox extends StatefulWidget {
  const Sandbox({Key ? key}) : super(key: key);

  @override
  State<Sandbox> createState() => _SandboxState();
}

class _SandboxState extends State<Sandbox> {

  double _opacity = 1;
  double _margin = 0;
  double _width = 200;
  Color _color = Colors.deepPurple;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: AnimatedContainer(
          margin: EdgeInsets.all(_margin),
          width: _width,
          color: _color,
          duration: Duration(seconds: 1),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Padding(
                padding: const EdgeInsets.all(5.0),
                child: ElevatedButton(
                  onPressed: () {
                    setState(() {
                      _margin = 50.0;
                    });
                  },
                  child: Text('Animate margin')
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(5.0),
                child: ElevatedButton(
                  onPressed: () {
                    setState(() {
                      _color = Colors.red;
                    });
                  },
                  child: Text('Animate color')
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(5.0),
                child: ElevatedButton(
                  onPressed: () {
                    setState(() {
                      _width = 400;
                    });
                  },
                  child: Text('Animate width')
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(5.0),
                child: ElevatedButton(
                  onPressed: () {
                    setState(() {
                      _opacity = 0;
                    });
                  },
                  child: Text('Animate opacity')
                ),
              ),
              AnimatedOpacity(
                duration: Duration(seconds: 1),
                opacity: _opacity,
                child: Text(
                  'Hide me',
                  style: TextStyle(color: Colors.white,),
                ),
              )

            ],
          ),
        ),
      ),
    );
  }
}

