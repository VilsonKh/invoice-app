import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSANGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};

// const firebaseConfig = {
// 	apiKey: "AIzaSyCOi7imIvQzb3b8BvYl-Y-EfVyWSXSu86c",
// 	authDomain: "invoice-app-a1e1e.firebaseapp.com",
// 	projectId: "invoice-app-a1e1e",
// 	storageBucket: "invoice-app-a1e1e.appspot.com",
// 	messagingSenderId: "150063588083",
// 	appId: "1:150063588083:web:ff9bd95f99b906ba690d86",
// };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db };
