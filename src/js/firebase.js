import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/storage';
import 'firebase/messaging';
import refs from './refs.js';

const {
  loginFormBackdrop,
  loginFormCloseButton,
  signinBtn,
  signupBtn,
  regEmail,
  regPass,
  signupEmail,
  signupPass,
  logoutBtn,
  loginFields,
  loginErrorMessage,
  welcomeMeassage,
  libraryRef,
  googleAuth,
  phoneAuth,
  registrationBtn,
} = refs;

const firebaseConfig = {
  apiKey: 'AIzaSyClSr8NhpivoWB5Lv7Rn2LdhXp9p_wCrQs',
  authDomain: 'filmoteka-aa2ad.firebaseapp.com',
  databaseURL:
    'https://filmoteka-aa2ad-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-aa2ad',
  storageBucket: 'filmoteka-aa2ad.appspot.com',
  messagingSenderId: '822567007874',
  appId: '1:822567007874:web:16d7096246ee62fc26a69b',
};

firebase.initializeApp(firebaseConfig);
firebase.auth().useDeviceLanguage();

//Listener to BTN
registrationBtn.addEventListener('click', libraryAuth);
//login event
signinBtn.addEventListener('click', loginEvnt);
//signup event
signupBtn.addEventListener('click', signupEvnt);
//Google auth event
googleAuth.addEventListener('click', googleLogin);
//Phone auth event
phoneAuth.addEventListener('click', phoneLogin);
//logout event
logoutBtn.addEventListener('click', logoutEvnt);

function loginEvnt(e) {
  //get email and password
  e.preventDefault();
  const loginEmail = regEmail.value;
  const loginPassword = regPass.value;
  const auth = firebase.auth();
  //sign in
  const promise = auth.signInWithEmailAndPassword(loginEmail, loginPassword);
  promise.catch(error => loginError(error));
}

function signupEvnt(e) {
  //get email and password
  e.preventDefault();
  const signEmail = signupEmail.value;
  const signPassword = signupPass.value;
  const auth = firebase.auth();
  //create new user
  const promise = auth.createUserWithEmailAndPassword(signEmail, signPassword);
  promise.catch(error => loginError(error));
}

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      userExists(result.user);
    })
    .then(addEvntListenerOnModal)
    .catch(error => loginError(error));
}

function phoneLogin() {
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#phoneAuth', {
    signInOptions: [
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: 'image',
          size: 'normal',
          badge: 'bottomleft',
        },
        defaultCountry: 'UA',
        defaultNationalNumber: '0981111111',
        loginHint: '+380981111111',
      },
    ],
  });
}

function logoutEvnt() {
  firebase.auth().signOut();
  closeLoginForm();
}

//realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    loginFields.classList.add('is-hidden');
    googleAuth.classList.add('is-hidden');
    phoneAuth.classList.add('is-hidden');
    logoutBtn.classList.remove('is-hidden');
    libraryRef.removeEventListener('click', libraryAuth);
    addWelcomeMessage();
    closeLoginForm();
  } else {
    libraryRef.addEventListener('click', libraryAuth);
    loginFields.classList.remove('is-hidden');
    googleAuth.classList.remove('is-hidden');
    phoneAuth.classList.remove('is-hidden');
    logoutBtn.classList.add('is-hidden');
    welcomeMeassage.classList.add('is-hidden');
  }
});

function libraryAuth(e) {
  e.preventDefault();
  openLoginForm();
}

function loginError(err) {
  regPass.value = '';
  signupPass.value = '';
  loginErrorMessage.textContent = err;
  loginErrorMessage.classList.remove('is-hidden');
}

function addWelcomeMessage() {
  welcomeMeassage.classList.remove('is-hidden');
  welcomeMeassage.textContent = `Hi! You logged in under ${
    firebase.auth().currentUser.email || firebase.auth().currentUser.phoneNumber
  }`;
}

//Open and close login form on click/esc/side click/close button click
function openLoginForm() {
  loginFormBackdrop.classList.remove('is-hidden');
  document.querySelector('html').style.overflow = 'hidden';
  loginFormCloseButton.addEventListener('click', closeLoginForm);
  window.addEventListener('keydown', onEscDown);
  loginFormBackdrop.addEventListener('click', closeLoginFormOnBackdropClick);
}

function closeLoginForm() {
  //openLoginForm().classList.add('is-hidden');
  loginFormBackdrop.classList.add('is-hidden');
  loginErrorMessage.classList.add('is-hidden');
  loginFormCloseButton.removeEventListener('click', closeLoginForm);
  window.removeEventListener('keydown', onEscDown);
  document.querySelector('html').style.overflow = '';
  loginFormBackdrop.removeEventListener('click', closeLoginFormOnBackdropClick);
}

function onEscDown(event) {
  if (event.code === 'Escape') {
    closeLoginForm();
  }
}

function closeLoginFormOnBackdropClick(event) {
  if (event.target === loginFormBackdrop) {
    closeLoginForm();
  }
}

export default { firebase, openLoginForm };
