import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBD2hzf0emis8QACowFY9hcSXnlOCEFnsI",
  authDomain: "tenant-insight.firebaseapp.com",
  projectId: "tenant-insight",
  storageBucket: "tenant-insight.firebasestorage.app",
  messagingSenderId: "116920408241",
  appId: "1:116920408241:web:e9493bfc44b52e8416aa90",
  measurementId: "G-KE9JVH26KD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
