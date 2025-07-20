"use client";
import { useState } from "react";
import UserProfileHeader from "./UserProfileHeader";
import UserProgressInfo from "./components/UserProgressInfo";
import UserClassmatesInfo from "./components/UserClassmatesInfo";
import UserMembershipInfo from "./components/UserMembershipInfo";

const UserProfileContent = () => {
  const [activeSection, setActiveSection] = useState("progress");

  return (
    <div className="space-y-6">
      <UserProfileHeader
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {activeSection === "progress" && <UserProgressInfo />}
      {activeSection === "classmates" && <UserClassmatesInfo />}
      {activeSection === "membership" && <UserMembershipInfo />}
    </div>
  );
};

export default UserProfileContent;
