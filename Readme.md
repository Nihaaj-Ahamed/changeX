# Phone Market

Phone Market is a simple online marketplace for buying, selling, and exchanging mobile phones.

Users can create an account, publish detailed phone listings, browse available devices, save interesting listings, and contact sellers through chat. The app brings the complete phone marketplace experience into one place.

## What Problem Does It Solve?

Finding a trustworthy second-hand phone can be difficult when product details, photos, and seller communication are spread across different platforms. Phone Market keeps these details together so buyers can compare phones easily and sellers can reach interested buyers directly.

## How It Works

1. Create an account or sign in.
2. Browse phone listings by brand, type, price, storage, RAM, and location.
3. Open a listing to view photos, specifications, condition, warranty, and seller details.
4. Save listings for later or contact the seller through chat.
5. Sellers can create, update, and manage their own listings.

## Main Features

- **Phone marketplace** - List phones for sale or exchange.
- **Detailed listings** - Add price, brand, storage, RAM, location, specifications, and description.
- **Image uploads** - Add phone photos using Cloudinary storage.
- **Search and filtering** - Find relevant phones using marketplace filters.
- **Authentication** - Register and sign in with cookie-based JWT authentication.
- **User profiles** - View profile information and a user's listings.
- **Saved listings** - Save phones and access them later.
- **Real-time chat** - Communicate with sellers through conversations and live message notifications.
- **Listing management** - Update or delete listings that you own.
- **Responsive interface** - Use the marketplace on desktop and mobile screens.

## Benefits

- **For buyers:** Compare phone details in one place and contact sellers directly.
- **For sellers:** Publish rich listings with photos and reach people looking for phones.
- **For everyone:** Spend less time searching through scattered posts and messages.

## Technology

- React and Vite for the frontend
- Express and Node.js for the API
- MongoDB with Prisma for data storage
- Socket.IO for real-time messaging
- Cloudinary for image storage
- JWT and cookies for authentication

## Project Structure

- `client/` - React and Vite frontend
- `api/` - Express API, Prisma data access, authentication, and Cloudinary integration
- `socket/` - Socket.IO server for real-time chat notifications

## Quick Start

### Requirements

- Node.js 20.6 or newer (the API uses Node's `--env-file` option)
- npm
- MongoDB database
- Cloudinary account for image uploads

### 1. Install Dependencies

Install dependencies in each application directory:

```bash
cd api
npm install

cd ../client
npm install

cd ../socket
npm install
```

### 2. Configure Environment Variables

Create `api/.env`:

```env
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>/<database>"
JWT_SECRET_KEY="replace-with-a-long-random-secret"
CLIENT_URL="http://localhost:5173"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

Optional frontend variables can be placed in `client/.env`:

```env
VITE_API_URL="http://localhost:8800/api"
VITE_SOCKET_URL="http://localhost:4000"
```

Never commit `.env` files or real credentials. If a credential has been exposed, rotate it before using the project again.

### 3. Set Up the Database

After changing `api/prisma/schema.prisma`, apply the schema to MongoDB:

```bash
cd api
npx prisma db push
npx prisma generate
```

### 4. Run the Application

Start each service in a separate terminal:

```bash
# Terminal 1 - API
cd api
node --env-file=.env app.js
```

```bash
# Terminal 2 - Socket server
cd socket
node app.js
```

```bash
# Terminal 3 - Frontend
cd client
npm run dev
```

The services are available at:

- Frontend: `http://localhost:5173`
- API health check: `http://localhost:8800/`
- API routes: `http://localhost:8800/api`
- Socket server: `http://localhost:4000`

## Useful Commands

```bash
cd client
npm run build       # Create a production build
npm run lint        # Run ESLint
npm run preview     # Preview the production build
```

The API uses cookie-based JWT authentication and expects requests to include credentials. The frontend API client and Socket.IO client are already configured for this in development.