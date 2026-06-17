# 🍳 Fridge to Plate AI

> Turn fridge leftovers into delicious meals with the power of AI.

Fridge to Plate AI is a local-first recipe generator that helps users discover creative meal ideas using ingredients they already have at home. Upload a photo of your fridge or pantry, or manually select ingredients, and let AI generate personalized recipes in seconds.

The project combines Groq Vision and Groq Language Models to identify food items and transform them into practical, waste-reducing recipes.

---

## 🌟 Features

### 📸 AI Ingredient Detection

Upload a photo of your fridge or pantry and the AI automatically identifies visible ingredients.

### 🥬 Manual Ingredient Selection

Prefer not to upload an image? Simply choose ingredients manually.

### 🤖 AI Recipe Generation

Generates **3 unique recipes** based on available ingredients.

### ⏱️ Complete Recipe Details

Every recipe includes:

* Recipe title
* Preparation time
* Ingredient list
* Step-by-step instructions
* Perishable ingredient recommendation

### 🌱 Reduce Food Waste

Helps users make better use of ingredients before they expire.

### ⚡ Local-First Design

Runs directly in the browser with minimal setup requirements.

### 📱 Responsive Interface

Works seamlessly across desktop, tablet, and mobile devices.

---

# 🚀 Demo Workflow

```text
Upload Fridge Photo
        │
        ▼
Image Compression
        │
        ▼
Groq Vision Model
        │
        ▼
Ingredient Detection
        │
        ▼
Groq Language Model
        │
        ▼
3 Personalized Recipes
```

---

# 🛠️ Tech Stack

| Technology        | Purpose              |
| ----------------- | -------------------- |
| HTML5             | Frontend Structure   |
| CSS3              | UI Styling           |
| JavaScript        | Application Logic    |
| Groq Vision API   | Ingredient Detection |
| Groq LLM API      | Recipe Generation    |
| Netlify Functions | Serverless Backend   |
| Marked.js         | Recipe Formatting    |

---

# 📂 Project Structure

```bash
fridge-to-plate/
│
├── index.html
├── netlify.toml
├── README.md
│
└── netlify/
    └── functions/
        └── generate-recipe.js
```

### index.html

Contains:

* User interface
* Image upload system
* Ingredient picker
* API integration
* Image compression
* Recipe rendering
* Error handling

### generate-recipe.js

Handles:

* Groq Vision API requests
* Ingredient extraction
* Recipe generation
* Serverless backend processing

### netlify.toml

Contains:

* Deployment configuration
* Function routing
* Redirect rules

---

# 🔥 AI Models Used

## Vision Model

```text
meta-llama/llama-4-scout-17b-16e-instruct
```

Used for:

* Fridge image analysis
* Ingredient identification

## Text Model

```text
llama-3.3-70b-versatile
```

Used for:

* Recipe generation
* Cooking instructions
* Ingredient prioritization

Fallback Model:

```text
llama-3.1-8b-instant
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/fridge-to-plate-ai.git
```

## Navigate to Project

```bash
cd fridge-to-plate-ai
```

## Add Groq API Key

Replace:

```javascript
PASTE_YOUR_GROQ_API_KEY_HERE
```

with your actual Groq API key in:

```bash
index.html
```

and

```bash
netlify/functions/generate-recipe.js
```

---

# ▶️ Run Locally

Simply open:

```bash
index.html
```

in your browser.

No build process required.

No framework installation required.

No database setup required.

---

# 🌍 Deployment

The project is deployment-ready for Netlify.

Deploy directly by:

1. Push code to GitHub
2. Connect repository to Netlify
3. Deploy

Netlify automatically detects:

```bash
netlify.toml
```

and configures routing and serverless functions.

---

# 📖 Example Output

### Recipe 1: Vegetable Stir Fry

⏱ Prep Time: 15 Minutes

Ingredients:

* Bell peppers
* Onion
* Carrot
* Oil
* Salt

Instructions:

1. Slice vegetables.
2. Heat oil.
3. Stir-fry vegetables.
4. Season and serve.

Perishable First:

👉 Use the bell peppers first.

---

# 🎯 Mission

Millions of tons of food are wasted every year because people don't know what to cook with ingredients they already own.

Fridge to Plate AI helps users:

* Reduce food waste
* Save money
* Discover new recipes
* Cook smarter with AI

---

# 🚀 Future Improvements

* Nutritional analysis
* Calorie tracking
* Dietary preferences
* Grocery list generation
* Recipe saving
* User accounts
* Meal planning
* Multi-language support

---

# 📄 License

MIT License

---

### 🍴 Open your fridge. Snap a photo. Let AI decide what's for dinner.
