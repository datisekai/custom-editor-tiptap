import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import './styles.scss'
import Indent from './extensions/indent'
import Zoom from './extensions/zoom'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import LineHeight from './extensions/line-height'
import ColorPicker from '@rc-component/color-picker';
import '@rc-component/color-picker/assets/index.css';
import Print from './extensions/print'


const extensions = [StarterKit, Document, Paragraph, Text, Bold, Indent.configure({
    types: ['paragraph', 'heading'], // Các node áp dụng
    defaultLevel: 0, // Mức thụt lề mặc định
    maxLevel: 10, // Mức thụt lề tối đa
}), Zoom.configure({
    defaultZoom: 1,
    maxZoom: 2,
    minZoom: 0.5,
    step: 0.1,
}), TaskList,
    TaskItem.configure({
        nested: true,
    }), LineHeight.configure({
        types: ['paragraph', 'heading'], // Node áp dụng
        defaultValue: '1.5',
        values: ['1', '1.5', '2', '2.5', '3'],
    }), Print,]

const content = '<p>Hello World12!</p>'

const MyEditor = () => {
    const editor = useEditor({
        extensions,
        content,
    })

    function removeFormatting() {
        editor?.chain().focus().unsetAllMarks().setNode('paragraph').run();
    }

    const handleBold = () => {
        editor?.chain().focus().toggleBold().run()
    }

    const handleIndent = () => {
        editor?.commands.indent();
    }

    const handleZoom = () => {
        editor?.commands.zoomIn()
    }

    const handleTaskList = () => {
        editor?.chain().focus().toggleTaskList().run()
    }

    const handlePrint = () => {
        editor.commands.print()
    }

    function changeLineHeight(value) {
        console.log('value', value);
        editor.commands.setLineHeight(value);
    }

    return (
        <>
            <div className={'editor'}>
                <div className={'header'}>
                    <button>Undo</button>
                    <button>Redo</button>
                    <button onClick={handlePrint}>Print</button>
                    <button>Paint</button>
                    <button onClick={handleZoom}>Select zoom</button>
                    <button>Select heading</button>
                    <button>Select font</button>
                    <button>group font size</button>
                    <button onClick={handleBold}>Bold</button>
                    <button>Italic</button>
                    <button>Underlined</button>
                    <button>Stroked</button>
                    <ColorPicker />
                    <button>Forecolor</button>
                    <button>Link</button>
                    <button>Image</button>
                    <button>Bullet list</button>
                    <button>Ordered list</button>
                    <button onClick={handleTaskList}>Task list</button>
                    <button>Left</button>
                    <button>Center</button>
                    <button>Right</button>
                    <select id="line-height-selector" onChange={e => changeLineHeight(e.target.value)}>
                        <option value="1">1</option>
                        <option value="1.5" selected>1.5</option>
                        <option value="2">2</option>
                        <option value="2.5">2.5</option>
                        <option value="3">3</option>
                    </select>
                    <button onClick={handleIndent}>Indent</button>
                    <button>Outdent</button>
                    <button onClick={removeFormatting}>Remove format</button>
                </div>
                <div className={'content'}>
                    <EditorContent editor={editor} />
                </div>

            </div>
        </>
    )
}

export default MyEditor
