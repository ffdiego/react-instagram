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
      <p className="my-10 font-thin text-sm text-gray-base text-right">
        by Diego Fernandes (@ffdiego) <br />•{" "}
        <a href="https://github.com/ffdiego">github.com/ffdiego</a>
      </p>
    </div>
  );
}
