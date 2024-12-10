import { Extension } from "@tiptap/core";

const Indent = Extension.create({
  name: "indent",

  addOptions() {
    return {
      types: ["paragraph"], // Các node mà extension này áp dụng
      defaultLevel: 0, // Mức thụt lề mặc định
      maxLevel: 10, // Mức thụt lề tối đa
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: this.options.defaultLevel,
            parseHTML: (element) =>
              parseInt(element.dataset.indent, 10) || this.options.defaultLevel,
            renderHTML: (attributes) => {
              if (attributes.indent && attributes.indent > 0) {
                return { style: `margin-left: ${attributes.indent * 20}px` };
              }
              return {};
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      indent:
        () =>
        ({ commands, state }) => {
          const { maxLevel } = this.options;
          const { indent = 0 } = state.selection.$from.node().attrs;
          if (indent < maxLevel) {
            return commands.updateAttributes("paragraph", {
              indent: indent + 1,
            });
          }
          return false;
        },

      outdent:
        () =>
        ({ commands, state }) => {
          const { defaultLevel } = this.options;
          const { indent = 0 } = state.selection.$from.node().attrs;
          if (indent > defaultLevel) {
            return commands.updateAttributes("paragraph", {
              indent: indent - 1,
            });
          }
          return false;
        },
    };
  },
});

export default Indent;
