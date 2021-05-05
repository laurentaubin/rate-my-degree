import { Flex, Select, Text } from "@chakra-ui/react";
import React from "react";

interface SortingBarProps {
  onSelectChange: (event: any) => void;
}

export const SortingBar: React.FC<SortingBarProps> = ({ onSelectChange }) => {
  return (
    <Flex>
      <Text fontSize="lg" fontWeight="semibold">
        Trier par
      </Text>
      <Select width="150px" size="sm" marginLeft="0.5vw" onChange={onSelectChange}>
        <option value="score">plus populaire</option>
        <option value="created_at">plus récent</option>
      </Select>
    </Flex>
  );
};
