"use client";
import { useEffect, useState } from "react";
import UserProfileHeader from "./UserProfileHeader";
import UserProgressInfo from "./components/UserProgressInfo";
import UserClassmatesInfo from "./components/UserClassmatesInfo";
import UserMembershipInfo from "./components/UserMembershipInfo";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/paths";
import { useUser } from "@/context/UserContext";
import LoaderComponent from "@/components/ui/loaderComponent";

const UserProfileContent = () => {
  const [activeSection, setActiveSection] = useState("progress");
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    router.replace(PATHS.USER_COURSES.PROFILE);
  }, [router]);

  if (isLoading || !user) {
    return <LoaderComponent />;
  }

  return (
    <div className="space-y-6">
      <UserProfileHeader
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {activeSection === "progress" && <UserProgressInfo user={user} />}
      {activeSection === "classmates" && <UserClassmatesInfo user={user} />}
      {activeSection === "membership" && <UserMembershipInfo />}
    </div>
  );
};

export default UserProfileContent;
