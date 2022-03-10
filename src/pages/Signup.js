import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from '../constants/routes'
import { doesUsernameExist} from '../services/firebase'

export default function Signup() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "";

  const handleSignup = async (e) => {
    e.preventDefault();


    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists){
      try {
        const createdUserResult = await firebase.auth()
          .createUserWithEmailAndPassword(email, password);

        // authentication -> email & password & username (displayName)
        await createdUserResult.user.updateProfile(
          {
            displayName: username
          }
        );

        // firebase user collection (create a document)
        await firebase.firestore().collection('users').add(
          {
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullname,
            emailAddress: email.toLowerCase(),
            following: [],
            dateCreated: Date.now()
          }
        )

        navigate(ROUTES.DASHBOARD);
      } catch (err) {
        setEmail('');
        setUsername('');
        setFullname('');
        setPassword('');
      }
    } else {
      setError("That username is already taken, please try another.");
    }

  };

  useEffect(() => {
    document.title = "Signup - Instagram";
  }, []);
  

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone xd" className="max-w-full"/>
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white border p-4 border-gray-primary mb-4 rounded">
        <h1 className="flex justify-center w-full">
          <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4"/>
        </h1>
        
        {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
        <form onSubmit={handleSignup} method="POST">
          <input 
          aria-label="Enter your username" 
          type="text"
          placeholder="Username"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
          onChange={({target}) => setUsername(target.value)}
          value = {username}
          />
          <input 
          aria-label="Enter your full name" 
          type="text"
          placeholder="Full name"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
          onChange={({target}) => setFullname(target.value)}
          value = {fullname}
          />
          <input 
          aria-label="Enter your email address" 
          type="text"
          placeholder="Email address"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
          onChange={({target}) => setEmail(target.value)}
          value = {email}
          />
          <input 
          aria-label="Enter your password" 
          type="password"
          placeholder="Password"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
          onChange={({target}) => setPassword(target.value)}
          value = {password}
          />
          <button 
            disabled={isInvalid}
            type="submit"
            className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}
          >Sign Up</button>
        </form>
      </div>
      <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
        <p className="text-sm">have an account? <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">Log in</Link></p>
      </div>
      </div>
    </div>
  );
}