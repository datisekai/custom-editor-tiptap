import { Extension } from "@tiptap/core";

const Print = Extension.create({
  name: "print",

  addCommands() {
    return {
      print:
        () =>
        ({ state, view }) => {
          const content = view.dom.innerHTML;
          const printWindow = window.open("", "", "height=600,width=800");

          printWindow.document.write(
            "<html><head><title>Print</title></head><body>"
          );
          printWindow.document.write(content); // Nội dung HTML của editor
          printWindow.document.write("</body></html>");
          printWindow.document.close(); // Đóng cửa sổ tài liệu
          printWindow.print(); // Mở hộp thoại in ấn
        },
    };
  },
});

export default Print;
