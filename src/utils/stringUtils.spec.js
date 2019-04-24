import {capitalize} from './stringUtils';

describe("Capitalize", () => {
  it("capitalizes the first letter of each word in a string", () => {
    expect(capitalize("holi")).toEqual("Holi");
    expect(capitalize("Holi")).toEqual("Holi");
    expect(capitalize("")).toEqual("");
    expect(capitalize("my nAme is mArCoS")).toEqual("My NAme Is MArCoS");
    expect(capitalize("CAPITAL     ")).toEqual("CAPITAL     ");
    expect(capitalize("many     spaces s hould   not be a  problem"))
      .toEqual("Many     Spaces S Hould   Not Be A  Problem")
  })
});
