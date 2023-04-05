import 'package:flutter/material.dart';
import 'package:ninja_brew_crew/services/auth.dart';
import 'package:ninja_brew_crew/shared/loading.dart';

import '../../shared/constants.dart';

class SignIn extends StatefulWidget {
  // const SignIn({Key? key}) : super(key: key);

  final Function toggleView;
  const SignIn({Key? key, required this.toggleView}) : super(key: key);

  @override
  State<SignIn> createState() => _SignInState();
}

class _SignInState extends State<SignIn> {

  final AuthService _auth = AuthService();
  final _formKey =GlobalKey<FormState>();
  bool loading = false;

  //Text field state
  String email = '';
  String password = '';
  String error = '';

  @override
  Widget build(BuildContext context) {
    return loading? const Loading()  : Scaffold(
      backgroundColor: Colors.brown[100],
      appBar: AppBar(
        backgroundColor: Colors.brown[400],
        elevation: 0.0,
        title: const Text('Sign in to Brew Crew'),
        actions: [
          TextButton.icon(
            icon: const Icon(Icons.person),
            label: const Text('Register'),
            onPressed: () => widget.toggleView(),
          )
        ],
      ),
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 20.0, horizontal: 50.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              const SizedBox(height: 20.0,),
              TextFormField(
                decoration: textInputDecoration.copyWith(hintText: 'Email'),
                onChanged: (val){
                  setState(()=> email = val);
                },
                validator: (val)=> val!.isEmpty ? 'Enter email' : null,
              ),
              const SizedBox(height: 20.0,),
              TextFormField(
                decoration: textInputDecoration.copyWith(hintText: 'Password'),
                onChanged: (val){
                  setState(()=> password = val);
                },
                obscureText: true,
                validator: (val)=> val!.length < 6 ? 'Enter a password 6+ chars long' : null,
              ),
              const SizedBox(height: 20.0,),
              ElevatedButton(
                onPressed: () async {
                  if (_formKey.currentState!.validate()){
                    setState(()=> loading = true);
                    dynamic result = await _auth.signInWithAndPassword(email, password);
                    if(result == null){
                      setState(() {
                        loading = false;
                        error = 'Could not sign in with the provided credentials!!!';
                      });
                    }
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.pink[400],
                ),
                child: const Text('Sign in'),
              ),
              const SizedBox(height: 12.0,),
              Text(
                error,
                style: const TextStyle(
                  color: Colors.red,
                  fontSize: 14.0,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
