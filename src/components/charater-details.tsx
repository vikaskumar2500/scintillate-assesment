import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../lib/loader";
import {
  VStack,
  Box,
  Grid,
  Heading,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import { MoviesList } from "./movies-list";

function StarwarsCharacterDetails() {
  const [character, setCharacter] = useState<any>({});

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { characterId } = useParams();

  const fetchData = useCallback(async () => {
    try {
      console.log("running charater");
      setIsLoading(true);
      const response = await fetch(
        `https://swapi.dev/api/people/${characterId}/`
      );
      const data = await response.json();
      setCharacter(() => data);
    } catch (error) {
      toast({
        title: "Error loading Starwars character details",
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [characterId]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <VStack spacing={8} p={6} w="100%" maxW="700px" className="px-5">
        <div className="relative w-full h-full rounded-md -z-50">
          <Image
            src={`https://picsum.photos/200/200/?random=/${characterId}.jpg`}
            alt={`${character?.name} Image`}
            className=" w-full rounded-md"
          />
        </div>

      <div className="absolute flex flex-col items-center justify-centergap-5 gap-10 text-blue-200 w-[25rem]">
        <Heading as="h1" className="text-blue-200 mt-5">{character?.name}</Heading>
        {!isLoading && (
          <ul className="border w-full p-5 bg-gray-600 rounded-md text-center flex flex-col items-center justify-center">
            <li className="flex items-center gap-3">
              <span className="font-bold text-xl">Gender</span>{" "}
              <p>{character?.gender}</p>
            </li>
            <li className="flex items-center gap-3">
              <span className="font-bold text-xl">Height</span>{" "}
              <p>{character?.height}</p>
            </li>
            <li className="flex items-center gap-3">
              <span className="font-bold text-xl">Weight</span>{" "}
              <p>{character?.mass} kg</p>
            </li>
          </ul>
        )}

        {isLoading && (
          <Grid className="h-[25rem] flex items-center justify-center">
            <Loader className="text-black w-8 h-8 rounded-full dark:text-gray-100 animate-spin stroke-pink-50" />
          </Grid>
        )}

        {!isLoading && (
          <Suspense
            fallback={
              <Loader className="text-black w-8 h-8 rounded-full dark:text-gray-100 animate-spin stroke-pink-50" />
            }
          >
            <MoviesList character={character} />
          </Suspense>
        )}
      </div>
    </VStack>
  );
}

export default StarwarsCharacterDetails;
