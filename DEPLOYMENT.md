# Spotify Statistics App - Deployment Instructions

## Frontend Deployment (Netlify)

1. Go to [Netlify](https://netlify.com) and sign up or log in
2. Click "New site from Git"
3. Connect your repository
4. Set the following build settings:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables in the "Environment variables" section:
   - `VITE_API_URL`: Set to your backend URL (e.g., `https://your-app.onrender.com/api`)
6. Deploy the site

## Backend Deployment (Render)

1. Go to [Render](https://render.com) and sign up or log in
2. Click "New Web Service"
3. Connect your repository
4. Set the following settings:
   - Name: `spotify-backend` (or any name you prefer)
   - Runtime: Node
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
   - Root directory: `server`
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `PORT`: `10000`
6. Select "Free" instance type
7. Deploy the service

## Local Development

1. Start MongoDB (using Docker or local installation)
2. In the `server` directory, create a `.env` file with your database configuration
3. Run `npm install` in both `client` and `server` directories
4. Start the backend: `cd server && npm run dev`
5. Start the frontend: `cd client && npm run dev`
6. Access the app at `http://localhost:5173`

## Notes

- The frontend is configured to use Vite with React and Material-UI
- The backend uses Express with MongoDB via Mongoose
- API calls from the frontend are configured to work with environment variables
- CORS is enabled on the backend for cross-origin requests