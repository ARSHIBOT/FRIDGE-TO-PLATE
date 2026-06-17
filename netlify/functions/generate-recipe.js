const VISION_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";
const TEXT_MODEL = "llama-3.3-70b-versatile";
const FALLBACK_TEXT_MODEL = "llama-3.1-8b-instant";
const INGREDIENT_PROMPT = "List all visible food items in this fridge/pantry photo. Be very specific (e.g., 'half an onion', '3 eggs', 'wilted spinach', 'leftover chicken breast'). Return only a comma-separated list of ingredients, no extra text, no numbering.";
const GROQ_API_KEY = "enter your groq api key here";

function normalizeImageDataUrl(imageData) {
  if (imageData.startsWith("data:image/")) {
    return imageData;
  }
  return `data:image/jpeg;base64,${imageData}`;
}

async function callGroq(apiKey, body) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    const detail = data?.error?.message || text || `Status ${response.status}`;
    throw new Error(detail);
  }

  return data;
}

exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: JSON.stringify({ message: "OK" }) };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method Not Allowed. Use POST." }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON in request body." }) };
  }

  const imageData = body.image;
  const textData = body.text;

  if (!imageData && !textData) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Please provide an image or ingredient list." }) };
  }

  const apiKey = GROQ_API_KEY.trim();
  if (!apiKey || apiKey === "PASTE_YOUR_GROQ_API_KEY_HERE") {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Paste your Groq API key into the GROQ_API_KEY placeholder in generate-recipe.js." }) };
  }

  try {
    let ingredients = "";

    if (imageData) {
      const visionData = await callGroq(apiKey, {
        model: VISION_MODEL,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: INGREDIENT_PROMPT },
              { type: "image_url", image_url: { url: normalizeImageDataUrl(imageData) } }
            ]
          }
        ],
        temperature: 0.2,
        max_completion_tokens: 512
      });
      ingredients = visionData.choices[0].message.content.trim();
    } else {
      ingredients = textData;
    }

    if (!ingredients) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Could not identify any ingredients." }) };
    }

    const recipePrompt = `You are a creative chef. The user has these ingredients: ${ingredients}.
You may also assume basic pantry staples: salt, pepper, oil, butter, water, and common spices.

Generate 3 recipes that use ONLY these ingredients (plus the staples).

For each recipe, provide:
- A catchy recipe name.
- Estimated prep time.
- A list of ALL ingredients needed (only from the user's list + staples).
- Step-by-step cooking instructions.
- A note on which ingredient is most perishable and should be used first.

Format the response with clear separation between the 3 recipes. Use line breaks and numbering.`;

    let recipesData;
    try {
      recipesData = await callGroq(apiKey, {
        model: TEXT_MODEL,
        messages: [{ role: "user", content: recipePrompt }],
        temperature: 0.7,
        max_completion_tokens: 2048
      });
    } catch {
      recipesData = await callGroq(apiKey, {
        model: FALLBACK_TEXT_MODEL,
        messages: [{ role: "user", content: recipePrompt }],
        temperature: 0.7,
        max_completion_tokens: 2048
      });
    }

    const recipes = recipesData.choices[0].message.content.trim();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ingredients, recipes })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: `Groq API error: ${error.message}` })
    };
  }
};
