import { SearchIcon } from "@chakra-ui/icons";
import { Divider, Stack } from "@chakra-ui/layout";
import { HTMLChakraProps, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { NextChakraLink } from "components/navigation/NextChakraLink";
import { useCoursesQuery } from "generated/graphql";
import React, { useState } from "react";

interface SearchBarProps extends HTMLChakraProps<"div"> {
  size: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({ size, ...props }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isMousedOver, setIsMousedOver] = useState(false);

  const [{ data }] = useCoursesQuery({
    variables: {
      filter: query,
      limit: 5,
    },
  });

  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
  };

  const handleChangeFocus = () => {
    setIsFocused((focus) => !focus);
  };

  const handleMouseOver = () => {
    setIsMousedOver(() => true);
  };

  const handleMouseLeave = () => {
    setIsMousedOver(() => false);
  };

  const handleResultClick = () => {
    setIsMousedOver(() => false);
    setIsFocused(() => false);
  };

  return (
    <>
      <Stack
        {...props}
        minWidth="35vw"
        backgroundColor="white"
        borderRadius="6px"
        paddingBottom={isFocused && query ? "0.5rem" : "0"}
        onBlur={handleChangeFocus}
        onFocus={handleChangeFocus}
      >
        <InputGroup>
          <InputLeftElement minHeight={1.75 * size + "rem"} pointerEvents="none">
            <SearchIcon marginTop="0 !important" />
          </InputLeftElement>
          <Input
            placeholder="Rechercher un cours"
            minHeight={1.75 * size + "rem"}
            color="black"
            backgroundColor="white"
            onChange={handleInputChange}
            variant="unstyled"
          ></Input>
        </InputGroup>
        {query && (isFocused || isMousedOver) && (
          <>
            <Divider marginTop="0px !important" marginBottom="0.5rem" />
            <Stack
              textAlign="center"
              marginTop="0px !important"
              zIndex={1}
              onMouseEnter={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              onClick={handleResultClick}
            >
              {data ? (
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
          </>
        )}
      </Stack>
    </>
  );
};
