import React from "react";
import { Flex, Text, Select } from "@chakra-ui/react";

interface SortingBarProps {
  onSelectChange: (event: any) => void;
}

export const SortingBar: React.FC<SortingBarProps> = ({ onSelectChange }) => {
  return (
    <Flex>
      <Text fontSize="lg" fontWeight="semibold">
        Trier par
      </Text>
      <Select
        width="150px"
        size="sm"
        marginLeft="0.5vw"
        onChange={onSelectChange}
      >
        <option value="score">plus populaire</option>
        <option value="created_at">plus récent</option>
      </Select>
    </Flex>
  );
};
