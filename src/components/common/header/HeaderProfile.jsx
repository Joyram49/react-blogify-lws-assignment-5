import { Link } from "react-router-dom";
import { getImage } from "../../../utils/getImage";

export default function HeaderProfile({ auth }) {
  const fullName = auth?.user?.firstName + " " + auth?.user?.lastName;
  return (
    <li className='flex items-center'>
      {/* <!-- Circular Div with background color --> */}
      <Link to={`/profile/${auth?.user?.id}`}>
        <div className='avater-img bg-orange-600 text-white'>
          {auth?.user?.avatar ? (
            <img
              src={getImage(auth.user.avatar, "avatar")}
              alt='avatar'
              className='rounded-full w-full h-full object-cover'
            />
          ) : (
            <span className=''>{fullName.slice(0, 1)}</span>
          )}
          {/* <!-- User's first name initial --> */}
        </div>
      </Link>

      {/* <!-- Logged-in user's name --> */}
      <Link to={`/profile/${auth?.user?.id}`}>
        <span className='text-white ml-2'>{fullName}</span>
      </Link>
      {/* <!-- Profile Image --> */}
    </li>
  );
}
