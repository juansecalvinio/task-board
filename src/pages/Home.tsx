import { Box } from "@chakra-ui/react";
import { Board } from "../components/Board";
import { NewTaskModal } from "../components/NewTaskModal";
import { DeleteTaskModal } from "../components/DeleteTaskModal";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <Box>
      <Header />
      <Board />
      <NewTaskModal />
      <DeleteTaskModal />
      <Footer />
    </Box>
  );
};
