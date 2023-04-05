import 'package:firebase_auth/firebase_auth.dart';
import 'package:ninja_brew_crew/models/user.dart';
import 'package:ninja_brew_crew/services/database.dart';

class AuthService {

  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Function to create user object from firebase result
  MyUser? _userFromFirebase(User? user){
    return user != null ? MyUser(uid: user.uid) : null;
  }

  // Auth change user stream
  Stream<MyUser> get user {
    return _auth.authStateChanges().map((User? user) =>_userFromFirebase(user!)!);
  }

  Future signInAnon() async {
    try{
      UserCredential result = await _auth.signInAnonymously();
      User? user = result.user;
      
      return _userFromFirebase(user);
    } catch(e) {
      print(e.toString());
      return null;
    }
  }

  Future registerWithAndPassword(String email, String password) async{
    try{
       UserCredential result = await _auth.createUserWithEmailAndPassword(email: email, password: password);
       User user =result.user as User;

       // Create new coffee doc from user
       await DatabaseService(uid: user.uid).updateUserData('1', 'new crew member', 100);
       return _userFromFirebase(user);
    }catch(e){
      print(e.toString());
      return null;
    }

  }Future signInWithAndPassword(String email, String password) async{
    try{
       UserCredential result = await _auth.signInWithEmailAndPassword(email: email, password: password);
       User user =result.user as User;
       return _userFromFirebase(user);
    }catch(e){
      print(e.toString());
      return null;
    }
  }


  Future signOut() async{
    try{
      return await _auth.signOut();
    }catch(e){
      print(e.toString());
      return null;
    }
}
}