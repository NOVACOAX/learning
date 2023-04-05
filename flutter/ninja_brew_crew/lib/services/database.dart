import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:ninja_brew_crew/models/brew.dart';
import 'package:ninja_brew_crew/models/user.dart';

class DatabaseService {

  //  Collection ref
  final CollectionReference brewCollection = FirebaseFirestore.instance.collection('brews');
  final String? uid;
  DatabaseService({this.uid});


  Future updateUserData(String sugars, String name, int strength) async {
    return await brewCollection.doc(uid).set({
      'sugars': sugars,
      'name': name,
      'strength': strength,
    });
  }

  List<Brew> _brewListFromSnapshot(QuerySnapshot snapshot){
    return snapshot.docs.map((doc){
      return Brew(
        name: doc.data().toString().contains('name') ? doc.get('name') : '',
        strength: doc.data().toString().contains('strength') ? doc.get('strength') : '',
        sugars: doc.data().toString().contains('sugars') ? doc.get('sugars') : '',
      );
    }).toList();
  }

  // User data from snapshot
  UserData _userDataFromSnapshot(DocumentSnapshot snapshot){
    return UserData(
      uid: uid!,
      name: snapshot.get('name'),
      sugars: snapshot.get('sugars'),
      strength: snapshot.get('strength'),
    );
  }

  //  Get brews stream
  Stream<List<Brew>> get brews {
    return brewCollection.snapshots().map(_brewListFromSnapshot);
  }

  //  Get user stream
  Stream<UserData> get userData {
    return brewCollection.doc(uid).snapshots().map(_userDataFromSnapshot);
  }

}