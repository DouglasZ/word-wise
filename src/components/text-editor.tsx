import dynamic from "next/dynamic";
import {Ref, useMemo} from "react";
import {IJodit} from "jodit/types/types";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });


interface TextEditorProps {
    ref?: Ref<IJodit>;
    content: string;
    onChange?: (value: string) => void;
}

export const TextEditor = ({ content, onChange, ref}: TextEditorProps) => {

    const config = useMemo(
        () => ({
            readonly: false,
            height: 300,
            placeholder: "Description something about the word...",
        }),
        []
    );

    return(
        <JoditEditor
            ref={ref}
            value={content}
            config={config}
            tabIndex={2}
            onChange={onChange}
        />
    );
}