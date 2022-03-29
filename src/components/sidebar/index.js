import React, { useContext } from "react";
import useUser from "../../hooks/use-user";
import User from "./user";
import Suggestions from "./suggestions";
import UserContext from "../../context/user";

export default function Sidebar() {
  const { docId, fullname, username, following } = useContext(UserContext);

  return (
    <div className="mt-20 p-4">
      <User username={username} fullname={fullname} />
      <Suggestions username={username} following={following} />
    </div>
  );
}
