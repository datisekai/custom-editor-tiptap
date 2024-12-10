import { Extension } from "@tiptap/core";

const Zoom = Extension.create({
  name: "zoom",

  addOptions() {
    return {
      defaultZoom: 1, // Tỷ lệ mặc định
      maxZoom: 2, // Tỷ lệ phóng to tối đa
      minZoom: 0.5, // Tỷ lệ thu nhỏ tối thiểu
      step: 0.1, // Mức tăng/giảm zoom
    };
  },

  addCommands() {
    return {
      zoomIn:
        () =>
        ({ editor }) => {
          const currentZoom =
            editor.getAttributes("zoom").scale || this.options.defaultZoom;
          const newZoom = Math.min(
            currentZoom + this.options.step,
            this.options.maxZoom
          );

          editor.view.dom.style.transform = `scale(${newZoom})`;
          editor.view.dom.style.transformOrigin = "0 0";
          return editor.updateAttributes("zoom", { scale: newZoom });
        },

      zoomOut:
        () =>
        ({ editor }) => {
          const currentZoom =
            editor.getAttributes("zoom").scale || this.options.defaultZoom;
          const newZoom = Math.max(
            currentZoom - this.options.step,
            this.options.minZoom
          );

          editor.view.dom.style.transform = `scale(${newZoom})`;
          editor.view.dom.style.transformOrigin = "0 0";
          return editor.updateAttributes("zoom", { scale: newZoom });
        },

      resetZoom:
        () =>
        ({ editor }) => {
          editor.view.dom.style.transform = `scale(${this.options.defaultZoom})`;
          editor.view.dom.style.transformOrigin = "0 0";
          return editor.updateAttributes("zoom", {
            scale: this.options.defaultZoom,
          });
        },
    };
  },
});

export default Zoom;
