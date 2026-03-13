import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Reemplazar con la configuración completa de Firebase Console
// Por ahora usamos el Project ID recuperado del chatbot
const firebaseConfig = {
  projectId: "strategabot-e1afd",
  // El resto de valores (apiKey, etc) son necesarios para producción
  // pero el SDK puede funcionar parcialmente con solo el projectId en entornos limitados
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
