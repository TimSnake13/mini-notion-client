export const initialValue = [
  {
    type: "title",
    children: [{ text: "Enforce Your Layout!" }],
  },
  {
    type: "paragraph",
    children: [
      {
        text:
          "This example shows how you can make a hovering menu appear above your content, which you can use to make text ",
      },
      { text: "bold", bold: true },
      { text: ", " },
      { text: "italic", italic: true },
      { text: ", or anything else you might want to do!" },
    ],
  },
  {
    children: [
      { text: "Try it out yourself! Just " },
      { text: "select any piece of text and the menu will appear", bold: true },
      { text: "." },
    ],
  },
];
