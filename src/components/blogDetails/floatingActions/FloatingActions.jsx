import commentIcon from "../../../assets/icons/comment.svg";

import FavouriteAction from "./FavouriteAction";
import LikeAction from "./LikeAction";

export default function FloatingActions({ blog }) {
  const { comments } = blog;

  return (
    <div className='floating-action'>
      <ul className='floating-action-menus'>
        <LikeAction blog={blog} />

        <FavouriteAction blog={blog} />
        <a href='#comments'>
          <li>
            <img src={commentIcon} alt='Comments' />
            <span>{comments?.length}</span>
          </li>
        </a>
      </ul>
    </div>
  );
}
