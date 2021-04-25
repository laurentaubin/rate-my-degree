import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, Input, HTMLChakraProps, InputLeftElement } from "@chakra-ui/react";
import { Divider, Stack } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useCoursesQuery } from "../generated/graphql";
import { NextChakraLink } from "./NextChakraLink";

interface SearchBarProps extends HTMLChakraProps<"div"> {
  size: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({ size }) => {
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
      <Stack minWidth="30vw" backgroundColor="white" marginTop="4vh !important" borderRadius="6px" paddingBottom={query ? "0.5rem" : "0"}>
        <InputGroup>
          <InputLeftElement minHeight={3 * size + "vh"} pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input
            placeholder="Rechercher un cours"
            minHeight={3 * size + "vh"}
            color="black"
            backgroundColor="white"
            onChange={handleInputChange}
            variant="unstyled"
          ></Input>
        </InputGroup>
        {query && <Divider marginTop="0px !important" marginBottom="0.5rem" />}
        <Stack textAlign="center" marginTop="0px !important">
          {!fetching && data ? (
            data!.courses.map((course) => {
              return (
                <NextChakraLink
                  key={course.initials}
                  href={`/course/${course.initials}`}
                  color="black"
                  paddingTop="0.25rem"
                  paddingBottom="0.25rem"
                  _hover={{ backgroundColor: "main" }}
                >
                  {course.initials.toUpperCase()} - {course.title}
                </NextChakraLink>
              );
            })
          ) : (
            <div>loading...</div>
          )}
        </Stack>
      </Stack>
    </>
  );
};
