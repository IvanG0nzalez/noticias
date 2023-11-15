'use client'

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import mensajes from "@/componentes/Mensajes";
import { getToken } from "@/hooks/SessionUtilClient";
import { enviar } from "@/hooks/Conexion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
    const router = useRouter();
    const [texto, setTexto] = useState("");
    const [editorContent, setEditorContent] = useState("");
    const editor = useEditor({
        extensions: [
            StarterKit,

        ],
        content: "",
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setTexto(html);
            //console.log(texto);
            setEditorContent(editor.getJSON());
        }
    })

    if (!editor) {
        return null;
    }

    const submit = (e) => {
        e.preventDefault();
        if (texto !== null && texto !== '') {
            console.log(texto)
            var dato = {
                "texto": texto,
                "action": "nuevaNoticia"
            }
            let key = getToken();
            console.log(key);
            enviar("setvidorNoticias.php", dato, key).then(info => {
                console.log(info);
                router.push('/noticias');
            })
        } else {
            mensajes("Rellene una noticia", "Error de validción", "error");
        }
    }

    return (
        <>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                }
            >
                undo
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                }
            >
                redo
            </button>
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'is-active' : ''}
            >
                paragraph
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
                h1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
                h2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            >
                h3
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
            >
                h4
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
            >
                h5
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
            >
                h6
            </button>
            <EditorContent editor={editor} />
            <form onSubmit={submit} method="POST">
                <input type="hidden" value={texto} name="texto" id="texto"></input>
                <div className="row">
                    <div className="col-2">
                        <input type="submit" value="GUARDAR" className="btn btn-success"></input>
                    </div>
                    <div className="col-2">
                        <Link href="/noticias" className="btn btn-danger">VOLVER</Link>
                    </div>
                </div>
            </form>
        </>
    );
}