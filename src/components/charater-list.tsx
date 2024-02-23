import React, { useState, useEffect } from "react";
import { Loader } from "../lib/loader";
import {
  VStack,
  Button,
  Box,
  Link,
  Center,
  Grid,
  GridItem,
  Heading,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import BeatLoader from "react-spinners/BeatLoader";

function StarwarsCharacterList() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://swapi.dev/api/people/?page=${currentPage}`
        );
        const data = await response.json();
        if (!data || data.length === 0) return [];
        setCharacters(data.results);
        setIsLoading(false);
      } catch (error) {
        toast({
          title: "Error loading Starwars characters",
          status: "error",
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage === 1 ? 1 : prevPage - 1));
  };
  console.log(currentPage);

  return (
    <VStack spacing={8} p={6} maxW="700px" w="100%" className="px-5">
      <Heading as="h1">Characters</Heading>
      {!isLoading && (
        <Grid
          templateColumns="repeat(2, 1fr)"
          overflow={"scroll"}
          className="mostly-customized-scrollbar"
          gap={4}
          height={"25rem"}
          w="100%"
        >
          {characters.map((character: any) => (
            <GridItem key={character.url} className="relative">
              <VStack as={Box}>
                <Link
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  p={4}
                  w="100%"
                  href={`/characters/${character.url.split("/")[5]}`}
                  className="relative z-10"
                >
                  <Image
                    src={`https://picsum.photos/200/200/?random=/${Number(
                      character.url.split("/")[5] / 11
                    )}.jpg`}
                    alt={`${character.name} Image`}
                    className="h-[8rem] w-full"
                  />
                  <Heading as="h2" size="md" mb={2}>
                    {character.name}
                  </Heading>
                  <Text>Gender: {character.gender}</Text>
                  <Text>Height: {character.height}</Text>
                  <Text>Mass: {character.mass}</Text>
                </Link>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      )}
      {isLoading && (
        <Grid className="h-[25rem] flex items-center justify-center">
          <Loader className="text-black w-8 h-8 rounded-full dark:text-gray-100 animate-spin stroke-pink-50" />
        </Grid>
      )}
      <Box w="100%" className="flex items-center justify-between px-3">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          mr={2}
          className="border"
        >
          Previous
        </Button>
        {isLoading && (
          <Button
            onClick={handleNextPage}
            className="border"
            isLoading
            colorScheme="blue"
            spinner={<BeatLoader size={8} color="white" />}
          >
            Next
          </Button>
        )}
        {!isLoading && (
          <Button
            onClick={handleNextPage}
            className="border"
            colorScheme="blue"
          >
            Next
          </Button>
        )}
      </Box>
    </VStack>
  );
}

export default StarwarsCharacterList;
