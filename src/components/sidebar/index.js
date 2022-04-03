import React, { useContext } from "react";
import User from "./user";
import Suggestions from "./suggestions";
import UserContext from "../../context/user";

export default function Sidebar() {
  const { fullname, username, following } = useContext(UserContext);
  return (
    <div className="mt-20 p-4">
      <User username={username} fullname={fullname} />
      <Suggestions username={username} following={following} />
    </div>
  );
}
