import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserByUsername } from "../services/firebase";
import Header from "../components/header";
import * as ROUTES from "../constants/routes";

export default function Profile() {
  const { username } = useParams();
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUserExists() {
      const userinfo = await getUserByUsername(username);
      if (userinfo) {
        console.log("user", userinfo);
        setUserExists(true);
      } else {
        navigate(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, navigate]);

  return (
    <div className="bg-gray-primary">
      <Header />
      <div className="mx-auth max-w-screen-lg">
        <p>hello {username}</p>
      </div>
    </div>
  );
}
