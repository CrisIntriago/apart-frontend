import { PATHS } from "@/constants/paths";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(PATHS.NOT_COURSE_ASIGNED);
}