import { PATHS } from "@/constants/paths";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(PATHS.USER_COURSES.PROFILE);
}