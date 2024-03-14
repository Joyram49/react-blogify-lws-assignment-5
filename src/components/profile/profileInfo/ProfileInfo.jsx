import ProfileBio from "./ProfileBio";
import ProfileImage from "./ProfileImage";

export default function ProfileInfo({ profile }) {
  const { avatar, firstName, lastName, bio, email, id } = profile || {};

  return (
    <div className='flex flex-col items-center py-8 text-center'>
      {/* <!-- profile image --> */}
      <ProfileImage avatar={avatar} firstName={firstName} profileId={id} />
      {/* <!-- name , email --> */}
      <div>
        <h3 className='text-2xl font-semibold text-white lg:text-[28px]'>
          {firstName} {lastName}
        </h3>
        <p className='leading-[231%] lg:text-lg'>{email}</p>
      </div>

      {/* <!-- bio --> */}
      <ProfileBio bio={bio} profileId={id} />
      <div className='w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8'></div>
    </div>
  );
}
