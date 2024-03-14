import { useAuth } from "../../../hooks/auth/useAuth";
import FavBlogList from "./FavBlogList";
import PopularBlogList from "./PopularBlogList";

export default function SideBar() {
  const { auth } = useAuth();
  return (
    <div className='md:col-span-2 h-full w-full space-y-5'>
      <PopularBlogList />
      {auth?.accessToken && <FavBlogList />}
    </div>
  );
}
