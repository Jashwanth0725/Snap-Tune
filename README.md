# AI Caption Generator – SaaS

An AI-powered SaaS application that generates intelligent and creative captions when a user uploads a single image. Built for content creators, social media users, and marketers who want fast, smart, and engaging captions for their visuals.

## Features

1. ```Image Caption Generation:``` Upload a single image and get an automatically generated caption powered by AI.

2. ```Modern UI:``` Responsive, user-friendly interface with smooth interactions.

3. ```History Tracking:``` View and manage previously generated saved captions.

4. ```Authentication:``` Secure login system with Google authentication.

5. ```Free Tier:``` Users get a limited number of 20 free caption generations before upgrading.

6. ```Scalable Backend:``` Built to handle multiple users and AI requests with ease.

## 🛠️ Tech Stack
1. `Frontend:` React.js + Tailwind CSS + Typescript

2. `Backend:` Node.js + Express.js

3. `AI Integration:` Gemini

4. `Database:` MongoDB

5. `Authentication:` Firebase Auth

6. `Payments:` Stripe (currently in Test Mode for development)


7. `Storage:` Cloudinary

## 📷 How It Works
1. Sign up or log in to the app.

2. Upload a single image.

3. The AI processes the image and returns a relevant caption.

4. Copy, share, or save the caption instantly.

## 💡 Use Cases
1. Instagram influencers looking for quick, catchy captions

2. Social media managers automating caption generation

3. Bloggers and marketers enhancing visual storytelling

## 📁 Project Structure
```bash
/client                 # Frontend code (React + TypeScript)
/client/src
    /api               # API calls to backend
    /auth              # Authentication logic (Firebase)
    /components        # Reusable UI components
    /db                # Client-side data management
    /layout            # Layout components (Navbar, Footer)
    /pages             # Page components (Home, Upload, History, etc.)
    /utils             # Utility functions/helpers
    App.css
    App.tsx
    index.css
    main.tsx           # Entry point

/server                # Backend API + AI caption generation logic
/server/public         # Static files
/server/src
    /apis              # External API integrations (Gemini)
    /controllers       # Business logic
    /db                # Database connection/config
    /middlewares       # Express middlewares (auth, error handling)
    /models            # Mongoose models
    /routes            # Express routes
    /utils             # Helper functions/utilities
    app.js             # Main Express app config
    constants.js       # Constant values
    index.js           # Server entry point

README.md              # Project documentation

```

## ✅ Running Locally

### Clone the repository
```
git clone https://github.com/Jashwanth0725/Snap-Tune.git
```

### Go into the project directory
```
cd Snap-Tune
```

### Install dependencies (for both frontend & backend)
```
npm install

cd client && npm install
```

### Start the frontend server
```
# In one terminal

cd client
npm run dev        # Starts frontend server
```

### Start the development server
```
# In another terminal

npm run dev        # Starts backend server
```
## 📈 Future Roadmap
 1. Support for multiple images

2. Mood-based caption customization

 3. User dashboard saved captions

 4. Analytics dashboard for user engagement

 5. Premium subscription model with Stripe
