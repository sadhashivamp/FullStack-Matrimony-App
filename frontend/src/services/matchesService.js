import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/matrimony-sadha-dev/matches";

// ✅ Fetch Recommended Matches
export const getRecommendedMatches = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/recommended/${userId}`);
        return response.data.matches;
    } catch (error) {
        console.error("Error fetching recommended matches:", error);
        return [];
    }
};

// ✅ Fetch Caste-Based Matches
export const getCasteMatches = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/caste-wise/${userId}`);
        return response.data.matches;
    } catch (error) {
        console.error("Error fetching caste-wise matches:", error);
        return [];
    }
};

// ✅ Fetch All Matches
export const getAllMatches = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all`);
        return response.data.matches;
    } catch (error) {
        console.error("Error fetching all matches:", error);
        return [];
    }
};
