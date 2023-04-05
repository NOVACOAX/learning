import 'package:flutter/material.dart';
import 'package:ninja_brew_crew/models/user.dart';
import 'package:ninja_brew_crew/screens/authenticate/authenticate.dart';
import 'package:provider/provider.dart';
import 'package:ninja_brew_crew/screens/home/home.dart';

class Wrapper extends StatelessWidget {
  const Wrapper({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final userStream = Provider.of<MyUser?>(context);
    // print(userStream);
    if(userStream == null){
      return const Authenticate();
    } else {
      return Home();
    }
  }
}
