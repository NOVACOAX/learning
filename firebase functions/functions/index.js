const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {setGlobalOptions} = require("firebase-functions/v2");
const functions = require("firebase-functions");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore, FieldValue} = require("firebase-admin/firestore");
setGlobalOptions({maxInstances: 10});
initializeApp();

// //  http request 1
// exports.randomNumber = onRequest({
//   cors: false,
// }, (request, response) => {
//   const number = Math.round(Math.random() * 100);
//   console.log(number);
//   response.status(200).send(number.toString());
// });

// //  http request 2
// exports.toTheMagpie = onRequest((request, response) => {
//   console.log("redirecting");
//   response.redirect("https://novacoax.github.io/magpie/");
// });

// // http callabe function
// exports.sayHello = onCall((request) => {
//   return `Hello ${request.data.name}`;
// });

// auth trigger (new user signup)
exports.newUserSignup = functions.auth.user().onCreate((user) => {
  // console.log("user created : ", user.email, user.uid);
  return getFirestore().collection("users").doc(user.uid).set({
    email: user.email,
    upvotedOn: [],
  });
});

// auth trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete((user) => {
  // console.log("user deleted : ", user.email, user.uid);
  const doc = getFirestore().collection("users").doc(user.uid);
  return doc.delete();
});

// http callable function (add a request)
exports.addRequest = onCall((request) => {
  // check auth status
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Only users can add new requests");
  }
  if (request.data.text.length > 30) {
    throw new HttpsError(
        "invalid-argument",
        "request must be no more than 30 characters long",
    );
  }
  return getFirestore().collection("requests").add({
    text: request.data.text,
    upvotes: 0,
  }).then((snapshot) => {
    return "Success";
  });
});

// http callable function (upvote)
exports.upvote = onCall(async (request)=>{
  // check auth status
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Only users can add new requests");
  }
  const user = getFirestore().collection("users").doc(request.auth.uid);
  const requestDoc = getFirestore().collection("requests").doc(request.data.id);

  const doc = await user.get();
  if (doc.data().upvotedOn.includes(request.data.id)) {
    throw new HttpsError("failed-precondition", "You can only upvote once");
  }

  await user.update({
    upvotedOn: [...doc.data().upvotedOn, request.data.id],
  });

  return requestDoc.update({
    upvotes: FieldValue.increment(1),
  });
});
