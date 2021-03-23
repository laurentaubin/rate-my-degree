import { Input } from "@chakra-ui/input";
import { useCoursesQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = useCoursesQuery();
  console.log(data);

  return <Input placeholder="Search a course"></Input>;
};
export default Index;
