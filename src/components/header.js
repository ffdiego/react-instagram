import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import * as ROUTES from "../constants/routes";

import { HomeIcon, SignOutIcon, AddIcon } from "./icons";
import NewPhoto from "./newPhoto";

export default function Header() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const username = user.username;

  const [showOverlay, setShowOverlay] = useState(false);

  function toggleOverlay() {
    setShowOverlay(!showOverlay);
  }

  function SignOut() {
    firebase.auth().signOut();
    navigate(ROUTES.LOGIN);
    user = null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-20 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="ml-2 flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                <img
                  src="/images/logo.png"
                  alt="Instagram"
                  className="mt-2 w-6/12"
                />
              </Link>
            </h1>
          </div>
          <div className="mr-2 text-gray-700 text-center flex items-center align-items">
            {user ? (
              <>
                {/* Caso usuário autenticado */}
                <AddIcon onClick={toggleOverlay} />
                <NewPhoto
                  showOverlay={showOverlay}
                  toggleOverlay={toggleOverlay}
                />
                <Link
                  type="button"
                  to={ROUTES.DASHBOARD}
                  aria-label="Dashboard"
                >
                  <HomeIcon />
                </Link>

                <button
                  type="button"
                  title="Sign out"
                  onClick={SignOut}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") SignOut();
                  }}
                >
                  <SignOutIcon />
                </button>

                <div className="flex items-center cursor-pointer">
                  <Link to={`/${username}`}>
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src={`/images/avatars/${username}.jpg`}
                      alt={`${username} profile`}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Caso de usuário não autenticado */}
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGNUP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
