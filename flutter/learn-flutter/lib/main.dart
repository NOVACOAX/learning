import 'package:flutter/material.dart';

void main(){
  runApp( const MaterialApp(
    home: Home(),
  ));
}

class Home extends StatelessWidget {
  const Home({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My first app'),
        centerTitle: true,
        backgroundColor: Colors.purple.shade700,
      ),
      body: Row(
        children: [
          Expanded(
              flex: 7,
              child: Image.asset('assets/images/img.png')
          ),
          Expanded(
            flex: 3,
            child: Container(
              padding:  const EdgeInsets.all(30.0),
              color: Colors.cyan,
              child: const Text('1'),
            ),
          ),
          Expanded(
            flex: 3,
            child: Container(
              padding:  const EdgeInsets.all(30.0),
              color: Colors.pinkAccent,
              child: const Text('2'),
            ),
          ),
          Expanded(
            flex: 5,
            child: Container(
              padding:  const EdgeInsets.all(30.0),
              color: Colors.amber,
              child: const Text('3'),
            ),
          ),
        ],
      ),

      // Column(
      //   mainAxisAlignment: MainAxisAlignment.start,
      //   crossAxisAlignment: CrossAxisAlignment.start,
      //   children: [
      //     Padding(
      //       padding: const EdgeInsets.all(8.0),
      //       child: Row(
      //         mainAxisAlignment: MainAxisAlignment.spaceBetween,
      //           crossAxisAlignment: CrossAxisAlignment.center,
      //           children: [
      //             Container(
      //               color: Colors.deepPurpleAccent,
      //               padding: const EdgeInsets.all(30.0),
      //               child: const Text('Some text'),
      //             ),
      //             ElevatedButton(
      //                 onPressed: (){},
      //                 style: ElevatedButton.styleFrom(
      //                   backgroundColor: Colors.deepPurpleAccent,
      //                  ),
      //                 child: const Text('Click me')
      //             ),
      //             const Text('hello world'),
      //           ],
      //       ),
      //     ),
      //     Container(
      //       padding:const EdgeInsets.all(20.0),
      //       color: Colors.deepPurple,
      //       child: const Text('Container 1'),
      //     ),
      //     Container(
      //       padding: const EdgeInsets.all(30.0),
      //       margin: const EdgeInsets.symmetric(vertical: 6.0),
      //       color: Colors.deepPurpleAccent,
      //       child: const Text('Container 2'),
      //     ),
      //     Container(
      //       padding:const EdgeInsets.all(40.0),
      //       color: Colors.purpleAccent,
      //       child: const Text('Container 3'),
      //     ),
      //   ],
      // ),

      // Row(
      //   mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      //   crossAxisAlignment: CrossAxisAlignment.start,
      //   children: [
      //     const Text('hello world'),
      //     ElevatedButton(
      //         onPressed: (){},
      //         style: ElevatedButton.styleFrom(
      //           backgroundColor: Colors.deepPurpleAccent,
      //          ),
      //         child: const Text('Click me')
      //     ),
      //     Container(
      //       color: Colors.deepPurpleAccent,
      //       padding: const EdgeInsets.all(30.0),
      //       child: const Text('Some text'),
      //     ),
      //   ],
      // ),

      // Container(
      //   padding: const EdgeInsets.all(20),
      //   margin: const EdgeInsets.all(40),
      //   color: Colors.grey,
      //   child: const Text('Container text'),
      // ),
      // Center(
      // child: IconButton(
      //   onPressed: (){},
      //   icon: const Icon(Icons.cabin),
      // ),
      // child: ElevatedButton.icon(
      //   onPressed: (){},
      //   icon: const Icon(Icons.mail),
      //   label: const Text('Mail me'),
      //   style: ElevatedButton.styleFrom(
      //     backgroundColor: Colors.purple[600],
      //   ),
      // ),
      // child: ElevatedButton(
      //   onPressed:(){
      //     print('You clicked me.');
      //   },
      //   child: const Text('Click me'),
      // ),
      // child: Icon(
      //   Icons.airport_shuttle,
      //   color: Colors.blueAccent,
      //   size: 100.0,),
      // child: Image.asset('assets/images/img.png'),
      // child: Image(
      //     // image: NetworkImage('https://images.unsplash.com/photo-1679305289765-c899db4ce88a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2876&q=80')
      // ),
      // ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {  },
        backgroundColor: Colors.purple.shade700,
        child: const Text('click'),
      ),
    );
  }
}

