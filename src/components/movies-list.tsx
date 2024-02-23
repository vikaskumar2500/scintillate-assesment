import { useToast, Grid, Heading } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "../lib/loader";
interface MoviesListProps {
  character: any;
}

export const MoviesList = ({ character }: MoviesListProps) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);

  const toast = useToast();
  const fetchMovies = useCallback(async (character: any) => {
    try {
      console.log(character);
      setIsMoviesLoading(true);
      const moviesData = await Promise.all(
        character.films.map(async (link: any) => {
          const movieRes = await fetch(`${link}`);
          return await movieRes.json();
        })
      );
      setMovies(moviesData);
    } catch (error: any) {
      console.error(error.message);
      // toast({
      //   title: "Failed to fetch movies",
      //   status: "error",
      //   isClosable: true,
      // });
    } finally {
      setIsMoviesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(character);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-bold">Movies List</h3>
      {!isMoviesLoading && (
        <ul className="flex flex-wrap gap-2 items-center justify-center">
          {movies.length > 0 &&
            movies.map((movie: any, index) => (
              <li
                key={index}
                className="border py-1 px-3 rounded-full cursor-pointer "
              >
                <span className="font-semibold text-center">
                  {movie?.title}
                </span>
              </li>
            ))}
        </ul>
      )}
      {isMoviesLoading && (
        <Grid className="flex items-center justify-center">
          <Loader className="text-black w-8 h-8 rounded-full dark:text-gray-100 animate-spin stroke-pink-50" />
        </Grid>
      )}
    </div>
  );
};
