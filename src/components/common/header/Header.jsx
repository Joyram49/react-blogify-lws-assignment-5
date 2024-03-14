import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import { useAuth } from "../../../hooks/auth/useAuth";
import HeaderLogout from "./HeaderLogout";
import HeaderProfile from "./HeaderProfile";
import Search from "./search/Search";

export default function Header() {
  const { auth, setAuth } = useAuth();

  return (
    <header>
      <nav className='container'>
        {/* <!-- Logo --> */}
        <div>
          <Link to='/'>
            <img className='w-32' src={logo} alt='lws' />
          </Link>
        </div>

        {/* <!-- Actions - Login, Write, Home, Search --> */}
        {/* <!-- Notes for Developers --> */}
        {/* <!-- For Logged in User - Write, Profile, Logout Menu --> */}
        {/* <!-- For Not Logged in User - Login Menu --> */}
        <div>
          <ul className='flex items-center space-x-5'>
            <li>
              <Link
                to={auth?.accessToken ? "blogs/create-blog" : "/login"}
                className='bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200'
              >
                Write
              </Link>
            </li>
            {auth?.accessToken && <Search />}
            {auth?.accessToken && <HeaderLogout setAuth={setAuth} />}
            {!auth?.accessToken && (
              <li>
                <Link
                  to='/login'
                  className='text-white/50 hover:text-white transition-all duration-200'
                >
                  Login
                </Link>
              </li>
            )}
            {auth?.accessToken && <HeaderProfile auth={auth} />}
          </ul>
        </div>
      </nav>
    </header>
  );
}
