/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "mulish-black": ["Mulish-Black"],
        "mulish-black-italic": ["Mulish-BlackItalic"],
        "mulish-bold": ["Mulish-Bold"],
        "mulish-bold-italic": ["Mulish-BoldItalic"],
        "mulish-extra-bold": ["Mulish-ExtraBold"],
        "mulish-extra-bold-italic": ["Mulish-ExtraBoldItalic"],
        "mulish-extra-light": ["Mulish-ExtraLight"],
        "mulish-extra-light-italic": ["Mulish-ExtraLightItalic"],
        "mulish-italic": ["Mulish-Italic"],
        "mulish-light": ["Mulish-Light"],
        "mulish-light-italic": ["Mulish-LightItalic"],
        "mulish-medium": ["Mulish-Medium"],
        "mulish-medium-italic": ["Mulish-MediumItalic"],
        "mulish-regular": ["Mulish-Regular"],
        "mulish-semi-bold": ["Mulish-SemiBold"],
        "mulish-semi-bold-italic": ["Mulish-SemiBoldItalic"],
      },
      colors: {
        primary: '#002859',
        secondary: '#D3DCE6',
        tertiary: '#C0CCDA',
        quaternary: '#647184',
        quinary: '#F9FAFC',
        accent: '#035AC5',
        background: '#EAF3FF',

      },
    },
  },
  plugins: [],
}

