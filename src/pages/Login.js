import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";

export default function Login() {
  const history = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "";

  const handleLogin = () => {};

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <p>i have no idea!</p>
    </div>
  );
}
