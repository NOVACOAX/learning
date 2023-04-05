import 'package:flutter/material.dart';
import 'package:ninja_brew_crew/models/user.dart';
import 'package:ninja_brew_crew/services/database.dart';
import 'package:ninja_brew_crew/shared/constants.dart';
import 'package:ninja_brew_crew/shared/loading.dart';
import 'package:provider/provider.dart';

class SettingsForm extends StatefulWidget {
  const SettingsForm({Key? key}) : super(key: key);

  @override
  State<SettingsForm> createState() => _SettingsFormState();
}

class _SettingsFormState extends State<SettingsForm> {

  final _formKey = GlobalKey<FormState>();
  final List<String> sugars = ['0', '1', '2', '3', '4'];

  // form values
  String? _currentName;
  String? _currentSugars;
  int? _currentStrength;

  @override
  Widget build(BuildContext context) {

    final userStream = Provider.of<MyUser?>(context);
    return StreamBuilder<UserData>(
      stream: DatabaseService(uid: userStream!.uid).userData,
      builder: (context, snapshot) {
        if(snapshot.hasData){

          UserData? userData = snapshot.data;
          return Form(
          key: _formKey,
          child: Column(
            children: [
              const Text(
                'Update your brew settings.',
                style: TextStyle(fontSize: 18.0),
              ),
              const SizedBox(height: 20.0),
              TextFormField(
                initialValue: userData?.name,
                decoration: textInputDecoration.copyWith(hintText: 'Name'),
                validator: (val) => val!.isEmpty ? 'Please enter a name' : null,
                onChanged: (val) => setState(() => _currentName = val),
              ),
              const SizedBox(height: 10.0),
              DropdownButtonFormField(
                value: _currentSugars ?? userData?.sugars,
                decoration: textInputDecoration,
                items: sugars.map((sugar) {
                  return DropdownMenuItem(
                    value: sugar,
                    child: Text('$sugar sugar(s)'),
                  );
                }).toList(),
                onChanged: (val) => setState(() => _currentSugars = val! ),
              ),
              const SizedBox(height: 10.0),
              Slider(
                value: (_currentStrength ?? userData?.strength ?? 100).toDouble(),
                activeColor: Colors.brown[_currentStrength ?? userData?.strength ?? 100],
                inactiveColor: Colors.brown[_currentStrength ?? userData?.strength ?? 100],
                min: 100.0,
                max: 900.0,
                divisions: 8,
                onChanged: (val) => setState(() => _currentStrength = val.round()),
              ),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.pink[400],
                ),
                child: const Text(
                  'Update',
                  style: TextStyle(color: Colors.white),
                ),
                onPressed: () async {
                  // print(_currentName);
                  // print(_currentSugars);
                  // print(_currentStrength);
                  if(_formKey.currentState!.validate()){
                    await DatabaseService(uid: userStream!.uid).updateUserData(
                      _currentSugars ?? userData!.sugars,
                      _currentName ?? userData!.name,
                      _currentStrength ?? userData!.strength,
                    );
                    // ignore: use_build_context_synchronously
                    Navigator.pop(context);
                  }
                }
              ),
            ],
          ),
        );
        } else {
          return const Loading();
        }
      }
    );
  }
}
