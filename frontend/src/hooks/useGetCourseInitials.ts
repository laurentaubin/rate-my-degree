import { useRouter } from "next/router";

const useGetCourseInitials = (): string => {
  const router = useRouter();
  return typeof router.query.pid === "string" ? (router.query.pid as string) : "-1";
};

export default useGetCourseInitials;
