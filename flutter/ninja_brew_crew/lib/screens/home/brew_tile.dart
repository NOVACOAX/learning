import 'package:flutter/material.dart';
import 'package:ninja_brew_crew/models/brew.dart';

class BrewTile extends StatelessWidget {

  final Brew brew;
  BrewTile({required this.brew});

  // const BrewTile({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 8.0),
      child: Card(
        margin: const EdgeInsets.fromLTRB(20.0, 6.0, 20.0, 0),
        child: ListTile(
          leading: CircleAvatar(
            radius: 25.0,
            backgroundColor: Colors.brown[brew.strength],
            backgroundImage: const AssetImage('assets/icon.png'),
          ),
          title: Text(brew.name),
          subtitle: Text('Takes ${brew.sugars} sugar(s).'),
        ),
      ),
    );
  }
}
