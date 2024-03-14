import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/common/footer/Footer";
import Header from "./components/common/header/Header";
import { useAuthCheck } from "./hooks/auth/useAuthCheck";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import EditBlogPage from "./pages/EditBlogPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import BlogProvider from "./providers/BlogProvider";
import BlogsProvider from "./providers/BlogsProvider";
import ProfileProvider from "./providers/ProfileProvider";
import SearchedBlogProvider from "./providers/SearchedBlogProvider";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthenticationSpinner from "./components/ui/AuthenticationSpinner";

export default function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <AuthenticationSpinner />
  ) : (
    <BlogsProvider>
      <SearchedBlogProvider>
        <BlogProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Navigate to='/blogs' replace />} />
            <Route path='/blogs' element={<HomePage />} />
            <Route
              path='/login'
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path='/register'
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route
              path='blogs/create-blog'
              element={
                <PrivateRoute>
                  <CreateBlogPage />
                </PrivateRoute>
              }
            />
            <Route
              path='blogs/:blogId/edit'
              element={
                <PrivateRoute>
                  <EditBlogPage />
                </PrivateRoute>
              }
            />
            <Route path='/blogs/:blogId' element={<BlogDetailsPage />} />
            <Route
              path='/profile/:profileId'
              element={
                <ProfileProvider>
                  <ProfilePage />
                </ProfileProvider>
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
          <ToastContainer />
        </BlogProvider>
      </SearchedBlogProvider>
    </BlogsProvider>
  );
}
