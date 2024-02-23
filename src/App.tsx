import "./style.css";
import { ChakraProvider, Box, theme, Link, Center } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import CharacterList from "./components/charater-list";
import CharacterDetails from "./components/charater-details";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CharacterList />,
    },
    {
      path: "/characters/:characterId",
      element: <CharacterDetails />,
    },
  ]);
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" marginTop={"5rem"} fontSize="xl">
        <nav className="fixed items-center justify-between top-0 left-0 w-full z-100 py-5 border-b-2">
          <Link href="/" className="w-full h-full">
            Home
          </Link>
          <ColorModeSwitcher className="text-gray-700" justifySelf="flex-end" />
        </nav>

        <Center className="w-[40rem] rounded-md h-full mx-auto">
          <RouterProvider router={router} />
        </Center>
      </Box>
    </ChakraProvider>
  );
};
