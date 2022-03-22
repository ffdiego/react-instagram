import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";

import Header from "../components/header";
import UserProfile from "../components/userprofile";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function checkUserExists() {
      const userinfo = await getUserByUsername(username);
      if (userinfo) {
        setUser(userinfo[0]);
      } else {
        navigate(ROUTES.NOT_FOUND, { replace: true });
      }
    }
    checkUserExists();
  }, [username, navigate]);

  return user ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auth max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}
