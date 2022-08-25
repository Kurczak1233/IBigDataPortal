import each from "jest-each";
import { mergedPostsMock } from "mocks/MergedPostsMock";
import { FiltrationLogic } from "./FiltrationLogic";

describe("Capitalize.test", () => {
  each([
    [
      {
        from: null,
        to: null,
        title: "",
        creator: "",
      },
      mergedPostsMock,
    ],
    [
      {
        from: new Date(2022, 10, 1),
        to: null,
        title: "",
        creator: "",
      },
      [mergedPostsMock[2]],
    ],
    [
      {
        from: null,
        to: new Date(2022, 10, 1),
        title: "",
        creator: "",
      },
      [mergedPostsMock[0], mergedPostsMock[1]],
    ],
    [
      {
        from: new Date(2022, 1, 1),
        to: new Date(2022, 10, 1),
        title: "",
        creator: "",
      },
      [mergedPostsMock[0]],
    ],
    [
      {
        from: new Date(2022, 1, 1),
        to: new Date(2022, 10, 1),
        title: "asdad",
        creator: "",
      },
      [],
    ],
    [
      {
        from: null,
        to: null,
        title: "",
        creator: "hahxdxd@wp.pl",
      },
      [mergedPostsMock[0], mergedPostsMock[1]],
    ],
    [
      {
        from: null,
        to: null,
        title: "",
        creator: "HAH",
      },
      [mergedPostsMock[0], mergedPostsMock[1]],
    ],
    [
      {
        from: null,
        to: null,
        title: "",
        creator: "HAHAHAHA",
      },
      [],
    ],
    [
      {
        from: null,
        to: null,
        title: "First",
        creator: "",
      },
      [mergedPostsMock[0]],
    ],
    [
      {
        from: null,
        to: null,
        title: "Second",
        creator: "",
      },
      [mergedPostsMock[1]],
    ],
    [
      {
        from: null,
        to: null,
        title: "Third",
        creator: "",
      },
      [mergedPostsMock[2]],
    ],
  ]).it("Should capitalize the text correctly", (initialValue, expected) => {
    const result = FiltrationLogic(initialValue, mergedPostsMock);
    expect(result).toEqual(expected);
  });
});
