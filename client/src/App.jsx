import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth } from "./routes/layout/layout";
import HomePage from "./routes/homePage/homePage";
import ListPage from "./routes/listPage/ListPage";
import SinglePage from "./routes/singlePage/SinglePage";
import ProfilePage from "./routes/profilePage/ProfilePage";
import Register from "./routes/register/Register";
import Login from "./routes/login/Login";
import ProfileUpdate from "./routes/profileUpdatePage/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import UpdatePostPage from "./routes/updatePostPage/UpdatePostPage";
import AboutPage from "./routes/aboutPage/aboutPage";
import SupportPage from "./routes/supportPage/supportPage";
import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
} from "./lib/loader";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      hydrateFallbackElement: (
        <div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
          Loading...
        </div>
      ),
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/support",
          element: <SupportPage />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      hydrateFallbackElement: (
        <div style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>
          Loading...
        </div>
      ),
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdate />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
        {
          path: "/update-post/:id",
          element: <UpdatePostPage />,
          loader: singlePageLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
