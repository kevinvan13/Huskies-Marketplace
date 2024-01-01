import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCLeMENaBw9ug2NBNnRlImffMB4pDVi-LA",
  authDomain: "huskies--marketplace.firebaseapp.com",
  projectId: "huskies--marketplace",
  storageBucket: "huskies--marketplace.appspot.com",
  messagingSenderId: "989695756493",
  appId: "1:989695756493:web:87b32cfbeef7421bd44184",
  measurementId: "G-2CSG9X175T",
};

const app = initializeApp(firebaseConfig);

export default app;
