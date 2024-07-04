import { AddIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa6";
import { useStore } from "../../context/store";

export const Header = () => {
  const { toggleColorMode } = useColorMode();
  const { setIsModalNewTaskOpen } = useStore();

  return (
    <Box
      as="header"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
        gap="1rem"
      >
        <Heading size={"lg"}>Task Board</Heading>
        <IconButton
          aria-label="add"
          onClick={() => setIsModalNewTaskOpen(true)}
          icon={<AddIcon />}
          colorScheme="yellow"
          size="sm"
        />
      </Box>
      <Box display="flex" alignItems={"center"} gap="0.5rem">
        <Link
          href="https://github.com/juansecalvinio/task-board"
          target="_blank"
        >
          <IconButton
            variant={"outline"}
            aria-label="github"
            icon={<FaGithub />}
            size="md"
          />
        </Link>
        <IconButton
          onClick={toggleColorMode}
          aria-label={useColorModeValue("Modo oscuro", "Modo claro")}
          icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
          size="md"
        />
      </Box>
    </Box>
  );
};
