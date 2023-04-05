import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:ninja_brew_crew/firebase_options.dart';
import 'package:ninja_brew_crew/screens/wrapper.dart';
import 'package:ninja_brew_crew/services/auth.dart';
import 'package:provider/provider.dart';
import 'models/user.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return StreamProvider<MyUser?>.value(
      catchError: (userStatus,user){
        return null;
      },
      initialData: null,
      value: AuthService().user,
      child: const MaterialApp(
        home: Wrapper(),
      ),
    );
  }
}
