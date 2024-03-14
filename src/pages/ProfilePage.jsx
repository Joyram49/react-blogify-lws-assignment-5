import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actions } from "../actions";
import MyBlogList from "../components/profile/myBlogs/MyBlogList";
import ProfileInfo from "../components/profile/profileInfo/ProfileInfo";
import Error from "../components/ui/Error";
import BlogLoader from "../components/ui/loader/BlogLoader";
import { useAuthorizedApi } from "../hooks/api/useAuthorizedApi";
import { useAuth } from "../hooks/auth/useAuth";
import { useProfile } from "../hooks/profile/useProfile";

export default function ProfilePage() {
  const { state, dispatch } = useProfile();
  const { auth } = useAuth();
  const { authorizedApi } = useAuthorizedApi();
  const { profileId } = useParams();
  const isMe = auth?.user?.id === state?.profile?.id;
  const fullName = state?.profile?.firstName + " " + state?.profile?.lastName;

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfileData = async () => {
      try {
        const response = await authorizedApi.get(`/profile/${profileId}`);
        if (response?.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response?.data,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error?.message,
        });
      }
    };
    fetchProfileData();
  }, [profileId, authorizedApi, dispatch]);

  // decide what to render
  let content = null;
  if (state?.loading) {
    content = <BlogLoader />;
  }

  if (state?.error) {
    content = <Error error={state?.error} />;
  }

  if (!state?.loading && state?.profile?.id) {
    content = (
      <main className='mx-auto max-w-[1020px] py-8'>
        <div className='container'>
          {/* <!-- profile info --> */}
          <ProfileInfo profile={state?.profile} />
          {/* <!-- end profile info --> */}

          <h4 className='mt-6 text-xl lg:mt-8 lg:text-2xl'>
            {isMe ? `My Blogs: ` : `${fullName}'s blogs : `}
          </h4>
          <MyBlogList myBlogs={state?.profile?.blogs} />
        </div>
      </main>
    );
  }

  return content;
}
