import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../services/firebase";
import ProfileSkeleton from "../components/userprofile/profileSkeleton";
import * as ROUTES from "../constants/routes";

import Header from "../components/header";
import UserProfile from "../components/userprofile";

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUserExists() {
      const profileInfo = await getUser(username);
      setLoading(false);
      if (profileInfo) setProfile(profileInfo);
    }
    checkUserExists();
  }, [username, navigate]);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg mt-20">
        {loading ? (
          <ProfileSkeleton />
        ) : profile ? (
          <UserProfile profile={profile} />
        ) : (
          <>
            <p className="text-center text-2xl font-semibold">
              This Page is Unavailable
            </p>
            <p className="mt-5 text-center text-xl">No account was found</p>
          </>
        )}
      </div>
    </div>
  );
}
