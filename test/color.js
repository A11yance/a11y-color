"use strict";

let {expect} = require("chai");

import {
  calculateContrastRatio,
  parseColor,
  suggestColors,
  Color,
} from "../src/color.js";

describe("parseColor", () => {
  describe("with a transparent value", () => {
    it("returns a Color object with zeros for values", () => {
      let transparentColor = parseColor("transparent");

      expect(transparentColor).to.deep.equal({
        red: 0,
        blue: 0,
        green: 0,
        alpha: 0
      });
    });
  });

  describe("with an rgb value", () => {
    it("returns a Color object with matching values and alpha of 1", () => {
      let rgbColor = parseColor("rgb(255, 255, 255)");

      expect(rgbColor).to.deep.equal({
        red: 255,
        blue: 255,
        green: 255,
        alpha: 1
      });
    });
  });

  describe("with an rgba value", () => {
    it("returns a Color object with matching values and alpha", () => {
      let rgbaColor = parseColor("rgba(255, 255, 255, 0.5)");

      expect(rgbaColor).to.deep.equal({
        red: 255,
        blue: 255,
        green: 255,
        alpha: 0.5
      });
    });
  });
});

describe("suggestColors", () => {
  describe("with white foreground color on white background color", () => {
    it("returns a gray value", () => {
      let white = parseColor("rgba(255, 255, 255, 1)");
      let foregroundColor = white;
      let backgroundColor = white;
      let desiredContrastRatios = {
        AA: 4.5,
        AAA: 7.0
      };

      let suggestions = suggestColors(foregroundColor, backgroundColor, desiredContrastRatios);

      expect(suggestions).to.deep.equal({
        AA: {
          bg: "#ffffff",
          contrast: "4.54",
          fg: "#767676"
        },
        AAA: {
          bg: "#ffffff",
          contrast: "7.00",
          fg: "#595959"
        }
      });
    });
  });
});

describe("calculateContrastRatio", () => {
  describe("with a white background", () => {
    describe("with a black foreground", () => {
      it("returns 21", () => {
        let backgroundColor = parseColor("rgb(255, 255, 255)");
        let foregroundColor = parseColor("rgb(0, 0, 0)");

        let contrastRatio = calculateContrastRatio(foregroundColor, backgroundColor);

        expect(contrastRatio).to.equal(21);
      });
    });
  });

  describe("with a white background", () => {
    describe("with a white foreground", () => {
      it("returns 1", () => {
        let backgroundColor = parseColor("rgb(255, 255, 255)");
        let foregroundColor = parseColor("rgb(255, 255, 255)");

        let contrastRatio = calculateContrastRatio(foregroundColor, backgroundColor);

        expect(contrastRatio).to.equal(1);
      });
    });
  });

  describe("with a white background and a light green foreground", () => {
    it("returns a dark green", () => {
      let bg = parseColor("rgb(255, 255, 255)");
      let fg = parseColor("rgb(2, 184, 117)");

      let suggestions = suggestColors(bg, fg, {
          AA: 3.0,
	  AAA: 4.5
      });

      expect(suggestions.AA.contrast).to.be.at.least(2.95);
      expect(suggestions.AAA.contrast).to.be.at.least(4.45);
    });
  });
});

describe("Color", () => {
  it("sets values for red, green, blue, and alpha", () => {
    let color = new Color(255, 255, 255, 1);

    expect(color).to.deep.equal({
      red: 255,
      blue: 255,
      green: 255,
      alpha: 1
    });
  });
});
