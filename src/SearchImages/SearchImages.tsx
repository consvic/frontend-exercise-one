import axios from "axios";
import React from "react";

import { Image } from "../types/Image.interface";
import { Img, Wrapper } from "./styles";

const API_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const URL = `https://api.unsplash.com/search/photos?client_id=${API_KEY}&query=`;
// api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

export function SearchImages() {
  const [searchText, setSearchText] = React.useState<string>("");
  const [images, setImages] = React.useState<Image[] | null>(null);
  const [page, setPage] = React.useState<number>(1);

  function onChangeInput(value: string) {
    setSearchText(value);
  }

  async function search() {
    try {
      const { data } = await axios.get(URL + searchText);
      setImages(data.results);
    } catch (error) {
      // Show error message instead
      console.log(error);
    }
  }

  async function fetchMore() {
    try {
      // make it an object instead of a string
      const { data } = await axios.get(`${URL}${searchText}&page=${page}}`);
      setImages([...(images || []), ...data.results]);
      setPage(page + 1);
    } catch (error) {
      // Show error message instead
      console.log(error);
    }
  }

  return (
    <main>
      <input
        value={searchText}
        onChange={(e) => onChangeInput(e.target.value)}
      />
      <button onClick={search}>Submit</button>

      <div>
        {images?.length === 0 && <div>No images found</div>}
        <Wrapper>
          {images?.map((image) => (
            <Img
              src={image.urls.regular}
              alt={image.description}
              key={image.id}
            />
          ))}
        </Wrapper>
      </div>
      {(images || [])?.length > 0 && (
        <button onClick={fetchMore}>Next page</button>
      )}
    </main>
  );
}
