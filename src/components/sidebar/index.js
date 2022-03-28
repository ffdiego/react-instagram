import React from "react";
import useUser from "../../hooks/use-user";
import User from "./user";
import Suggestions from "./suggestions";

export default function Sidebar() {
  const {
    user: { docId, fullname, username, userId, following },
  } = useUser();

  return (
    <div className="mt-20 p-4">
      <User username={username} fullname={fullname} />
      <Suggestions username={username} following={following} />
    </div>
  );
}

Sidebar.whyDidYouRender = false;
