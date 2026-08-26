// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import postRoute from './routes/post.route.js';
// import authRoute from './routes/auth.route.js';
// import testRoute from './routes/test.route.js';
// import userRoute from './routes/user.route.js';
// import charRoute from './routes/chat.route.js';
// import messageRoute from './routes/message.route.js';

// const app = express();
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({origin:process.env.CLIENT_URL, credentials:true}));

// app.use('/api/auth',authRoute);
// app.use('/api/users',userRoute);
// app.use('/api/posts',postRoute);
// app.use('/api/test',testRoute);
// app.use('/api/chats',charRoute);
// app.use('/api/messages',messageRoute);



// app.listen(8800, () => {
//   console.log('Server is running on port 8800');
// });
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js';
import testRoute from './routes/test.route.js';
import userRoute from './routes/user.route.js';
import charRoute from './routes/chat.route.js';
import messageRoute from './routes/message.route.js';

const app = express();

// 1. Production dynamic CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173", // Local Vite dev server
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(null, true); // Production-la temporary-a all origins allow panna
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// 2. Health check route (Render deploy test panna)
app.get('/', (req, res) => {
  res.send('API Server is running...');
});

// 3. API Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/test', testRoute);
app.use('/api/chats', charRoute);
app.use('/api/messages', messageRoute);

// 4. Port configuration for Render
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
