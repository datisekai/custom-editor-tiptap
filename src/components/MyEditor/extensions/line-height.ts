import { Extension } from "@tiptap/core";

const LineHeight = Extension.create({
  name: "lineHeight",

  addOptions() {
    return {
      types: ["paragraph", "heading"],
      defaultValue: "1.5",
      values: ["1", "1.5", "2", "2.5", "3"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultValue,
            renderHTML: (attributes) => {
              if (attributes.lineHeight === this.options.defaultValue) {
                return {};
              }

              return {
                style: `line-height: ${
                  attributes.lineHeight || this.options.defaultValue
                }`,
              };
            },
            parseHTML: (element) =>
              element.style.lineHeight || this.options.defaultValue,
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight:
        (value) =>
        ({ commands }) => {
          if (!this.options.values.includes(value)) {
            console.warn(`Invalid line-height value: ${value}`);
            return false;
          }
          return commands.updateAttributes("paragraph", {
            lineHeight: value,
          });
        },
    };
  },
});

export default LineHeight;
