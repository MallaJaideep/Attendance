// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
function StartFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyATojbqNq84Bulg6tK_LDs9SlMv_gfxMX0",
    authDomain: "attendance-1a183.firebaseapp.com",
    databaseURL: "https://attendance-1a183-default-rtdb.firebaseio.com",
    projectId: "attendance-1a183",
    storageBucket: "attendance-1a183.appspot.com",
    messagingSenderId: "887379910320",
    appId: "1:887379910320:web:768ac1b898bfd360b1a575",
    measurementId: "G-BM1CYPC7EV",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  return getDatabase(app);
}
export default StartFirebase;
