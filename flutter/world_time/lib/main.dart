import 'package:flutter/material.dart';
import 'package:world_time/pages/home.dart';
import 'package:world_time/pages/loading.dart';
import 'package:world_time/pages/choose_location.dart';
// import 'package:flutter/services.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  // SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersive);
  runApp( MaterialApp(
    initialRoute: '/',
    routes: {
      '/' : (context) => const Loading(),
      '/home' : (context) => const Home(),
      '/location' : (context) => const ChooseLocation(),
    },
  ));
}
