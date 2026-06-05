
import axios from 'axios';
import { AppFormData, ModuleType } from "../types";
import { auth } from "../firebaseConfig";

// Use the relative path for the API, configured in vite.config.ts proxy
const API_URL = '/api';

export const generateReading = async (type: ModuleType, data: AppFormData): Promise<{ text: string, images?: string[] }> => {
  
  // Get Firebase Auth Token securely
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Authentication required to consult the stars.");
  }
  
  // Force token refresh to ensure validity
  const token = await user.getIdToken(true);

  try {
    // Send request to our secure backend
    // The backend now handles all the prompt engineering, image generation, and Tarot logic securely.
    const response = await axios.post(
      `${API_URL}/generate-reading`, 
      { type, data },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Transmission Interrupted:", error);
    
    if (error.response?.status === 403) {
       throw new Error("Unauthorized: Please login again.");
    }
    
    if (error.response?.status === 500) {
        // Backend internal error
        throw new Error("The cosmic connection is weak (Server Error). Please try again.");
    }
    
    const errorMessage = error.response?.data?.error || "The stars are silent today. Please try again.";
    throw new Error(errorMessage);
  }
};
