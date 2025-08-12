"use client";
import { useEffect, useState } from "react";
import UserProfileHeader from "./UserProfileHeader";
import UserProgressInfo from "./components/UserProgressInfo";
import UserClassmatesInfo from "./components/UserClassmatesInfo";
import UserMembershipInfo from "./components/UserMembershipInfo";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/paths";
import { useUser } from "@/context/UserContext";

const UserProfileContent = () => {
  const [activeSection, setActiveSection] = useState("progress");
  const router = useRouter();
  const user = useUser();
    useEffect(() => {
    router.replace(PATHS.USER_COURSES.PROFILE);
  }, [router]);

  return (
    <div className="space-y-6">
      <UserProfileHeader
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {activeSection === "progress" && <UserProgressInfo user={user.user} />}
      {activeSection === "classmates" && <UserClassmatesInfo />}
      {activeSection === "membership" && <UserMembershipInfo />}
    </div>
  );
};

export default UserProfileContent;
