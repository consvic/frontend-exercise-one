import axios from "axios";
import React from "react";

import { API_KEY } from "../../constants/environment";
import { Image } from "../../types/Image.interface";
import { Button, ErrorMessage, Img, Input, Wrapper } from "./styles";

const URL = `https://api.unsplash.com/search/photos?client_id=${API_KEY}&query=`;
// api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

export function SearchImages() {
  const [searchText, setSearchText] = React.useState<string>("");
  const [images, setImages] = React.useState<Image[] | null>(null);
  const [page, setPage] = React.useState<number>(0);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  function onChangeInput(value: string) {
    setSearchText(value);
  }

  async function search(pageNum: number = 1) {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${URL}${searchText}&page=${pageNum}}`);
      setImages([...(images || []), ...data.results]);
      if (pageNum === 1) {
        setPage(1);
      } else {
        setPage(page + 1);
      }
      setError(null);
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <Input
        value={searchText}
        onChange={(e) => onChangeInput(e.target.value)}
      />
      <Button onClick={() => search()} disabled={isLoading}>
        {isLoading ? "Searching..." : "Submit"}
      </Button>
      <section>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {images?.length === 0 && <p>No images found</p>}
        <Wrapper>
          {images?.map((image) => (
            <Img
              src={image.urls.regular}
              alt={image.description}
              key={image.id}
            />
          ))}
        </Wrapper>
      </section>
      {(images || [])?.length > 0 && (
        <Button onClick={() => search(page + 1)}>Next page</Button>
      )}
    </main>
  );
}
