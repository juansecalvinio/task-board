import { Box, Link, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box as="footer" mt={"2rem"}>
      <Text textAlign={"right"}>
        by{" "}
        <Link href="https://juansecalvinio.com" target="_blank">
          juansecalvinio.com
        </Link>
      </Text>
    </Box>
  );
};
