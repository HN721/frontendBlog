import CreatePost from "./components/Posts/CreatePost";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import UpdatePost from "./components/Posts/UpdatePost";
import PostsList from "./components/Posts/PostsList";
import Home from "./components/Home/Home";
import PostDetails from "./components/Posts/PostDetails";
import Login from "./components/Home/Login";
import Register from "./components/Home/Register";
import Profile from "./components/Home/Profile";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { checkAuthenticatedAPI } from "./APIServices/usersApi/usersApi";
import { useEffect } from "react";
import { isAuthenticated } from "./redux/slice/authSlice";
import AuthRoute from "./components/authRoute/AuthRoute";
import UserDashbaord from "./components/User/UserDashboard";
import AccountSummaryDashboard from "./components/User/AccountSummary";

function App() {
  const dispatch = useDispatch();
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: checkAuthenticatedAPI,
  });
  //dispatch to store
  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [data]);
  const { userAuth } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      {userAuth ? <PrivateNavbar /> : <PublicNavbar />}
      {/* Navbar */}

      <Routes>
        {/* create post */}
        <Route element={<Home />} path="/" />
        <Route
          element={
            <AuthRoute>
              <UserDashbaord />
            </AuthRoute>
          }
          path="/dashboard"
        >
          <Route
            element={
              <AuthRoute>
                <AccountSummaryDashboard />
              </AuthRoute>
            }
            path=""
          />
          <Route
            element={
              <AuthRoute>
                <CreatePost />
              </AuthRoute>
            }
            path="create-post"
          />
        </Route>

        <Route element={<PostsList />} path="/posts" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
          path="/profile"
        />
        <Route element={<PostDetails />} path="/posts/:postId" />
        {/* <Route element={<UpdatePost />} path="/posts/:postId" /> */}
        {/* <CreatePost />
        <PostsList /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
