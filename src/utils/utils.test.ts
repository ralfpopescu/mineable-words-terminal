import {
  getWordFromHash,
  getHashFromWord,
  getWordLengthFromHash,
  hash,
  toUint88,
  normalizeWordHash,
} from "./word-util";
import { BigNumber } from "ethers";

const address = BigNumber.from("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

const abc = "0x0200440000000000000000";

test("correct length hash", () => {
  expect(abc.length).toBe(24);
});

test("get hash from word", () => {
  const word = getHashFromWord("abc");
  expect(word._hex).toBe(abc);
});

test("get word length from hash", () => {
  const length = getWordLengthFromHash(BigNumber.from(abc));
  expect(length).toBe(3);
});

test("get word from hash", () => {
  const word = getWordFromHash(BigNumber.from(abc));
  expect(word).toBe("abc");
});

test("uint88", () => {
  const uint88 = toUint88(
    BigNumber.from("0xf45ca3e1b761bd570f32221b1cfd33979e20d68ca4442b8c4c125d6854e31a69")
  );
  expect(uint88.toHexString()).toBe("0x442b8c4c125d6854e31a69");
});

test("normalized word", () => {
  const hash = BigNumber.from("0xf45ca3e1b761bd570f32221b1cfd33979e20d68ca4442b8c4c125d6854e31a69");
  const normalized = normalizeWordHash(hash);
  console.log({ normalized });
  expect(getWordFromHash(hash)).toBe(getWordFromHash(normalized));
});

test("fogey", () => {
  const nonce = BigNumber.from("0x3d5ad800088575");
  const hashed = hash({ address, nonce });
  expect(hashed._hex).toBe("0xf45ca3e1b761bd570f32221b1cfd33979e20d68ca4442b8c4c125d6854e31a69");
  const fogey = getWordFromHash(hashed);
  expect(fogey).toBe("fogey");
});
