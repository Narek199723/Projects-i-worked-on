export const firebaseConfig = {
  // apiKey: 'AIzaSyDjPqHgYfKeGL0idobKp7xyONZMUHcWk5I',
  // authDomain: 'vivid-canyon-321112.firebaseapp.com',
  // projectId: 'vivid-canyon-321112',
  // storageBucket: 'vivid-canyon-321112.appspot.com',
  // messagingSenderId: '55366784204',
  // appId: '1:55366784204:web:24351943e0f546b7b09e69',

  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
