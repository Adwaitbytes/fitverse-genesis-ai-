
interface GeminiConfig {
  apiKey: string;
  model: string;
}

interface GeminiResponse {
  success: boolean;
  message: string;
}

export const getGeminiResponse = async (
  prompt: string, 
  apiKey: string
): Promise<GeminiResponse> => {
  try {
    if (!apiKey) {
      return {
        success: false,
        message: "API key is required. Please enter your Gemini AI key in settings."
      };
    }

    // Use the Gemini API to get a response
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a fitness coach AI assistant named FitVerse AI Coach. 
                Respond to the following fitness query in a helpful, motivational and concise way: ${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("Gemini API error:", data.error);
      
      // Check for invalid API key error
      if (data.error.code === 401 || 
          (data.error.status === "UNAUTHENTICATED") || 
          data.error.message.includes("API key")) {
        return {
          success: false,
          message: "Invalid API key. Please check your Gemini AI key in settings."
        };
      }
      
      return {
        success: false,
        message: data.error.message || "Error connecting to Gemini AI"
      };
    }

    // Extract the response text from the Gemini API response
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
    
    return {
      success: true,
      message: responseText
    };
  } catch (error) {
    console.error("Error calling Gemini AI:", error);
    return {
      success: false,
      message: "Failed to connect to the Gemini AI service. Please try again later."
    };
  }
};
