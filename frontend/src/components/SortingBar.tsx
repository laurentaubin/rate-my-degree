import React from "react";
import { Flex, Text, Select } from "@chakra-ui/react";

interface SortingBarProps {
  onSelectChange: (event: any) => void;
}

export const SortingBar: React.FC<SortingBarProps> = ({ onSelectChange }) => {
  return (
    <Flex>
      <Text>Sort by</Text>
      <Select maxW="84px" size="sm" onChange={onSelectChange}>
        <option value="score">Score</option>
        <option value="created_at">Date</option>
      </Select>
    </Flex>
  );
};
