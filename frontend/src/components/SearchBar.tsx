import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftAddon, Input, HTMLChakraProps } from "@chakra-ui/react";
import { Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useCoursesQuery } from "../generated/graphql";

interface SearchBarProps extends HTMLChakraProps<"div"> {
  size: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({ size, ...props }) => {
  const [query, setQuery] = useState("");

  const [{ data, fetching }] = useCoursesQuery({
    variables: {
      filter: query,
      limit: 5,
    },
  });

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <InputGroup marginTop="4vh" {...props}>
        <InputLeftAddon minHeight={3 * size + "vh"}>
          <SearchIcon />
        </InputLeftAddon>
        <Input
          placeholder="Rechercher un cours"
          minHeight={3 * size + "vh"}
          color="black"
          backgroundColor="white"
          onChange={handleInputChange}
        ></Input>
      </InputGroup>
      {!!(!fetching && data) ? (
        data!.courses.map((course) => {
          return <Text color="white">{course.initials}</Text>;
        })
      ) : (
        <div>loading</div>
      )}
    </>
  );
};
