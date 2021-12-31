import styled from "styled-components";
import { adlibs } from "./adlibs";
import { Highlight } from "../../../Highlight";

const Container = styled.div``;

const randomIndex = (arr: any[]) => Math.floor(Math.random() * arr.length);

const processAdlib = (adlib: string, words: string[]) => {
  const split = adlib.split("#");
  const used: boolean[] = [];
  console.log({ split, used, words });
  const randomWords = Array(split.length - 1)
    .fill(null)
    .map(() => {
      let r = randomIndex(words);
      if (!used[r] || used.length === words.length) {
        used[r] = true;
        return words[r];
      }
      while (used[r]) {
        r = randomIndex(words);
        if (!used[r]) {
          used[r] = true;
          return words[r];
        }
      }
      return "";
    });
  const composed = [];
  for (let i = 0; i < split.length * 2 - 1; i += 1) {
    if (i % 2) composed.push(randomWords[Math.floor(i / 2)]);
    else composed.push(split[Math.floor(i / 2)]);
  }
  return composed;
};

export const Adlib = () => {
  const foundWords = localStorage.getItem("found");
  const parsed = foundWords ? JSON.parse(foundWords) : {};

  const randomAdlib = adlibs[Math.floor(Math.random() * adlibs.length)];
  const text = processAdlib(randomAdlib, Object.keys(parsed));

  console.log({ text });

  return (
    <Container>
      {foundWords ? (
        <>
          {text.map((t, i) => {
            if (i % 2) return <Highlight>{t}</Highlight>;
            return <span>{t}</span>;
          })}
        </>
      ) : (
        <div>No mwords found. Use command "mine" to find them.</div>
      )}
    </Container>
  );
};
