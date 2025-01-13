import React, { useRef, useEffect } from "react";

const Note = ({ value, onChange, readOnly }) => {
    const noteRef = useRef(null);

    useEffect(() => {
        const textarea = noteRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    }, [value]); // Пересчитываем высоту при изменении value

    const autoResize = (e) => {
        const textarea = e.target;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
        if (onChange) {
            onChange(e); // Вызываем переданный обработчик onChange
        }
    };

    return (
        <div className="note-container">
            <textarea
                ref={noteRef}
                maxLength="10000"
                id="noteTextarea"
                name="note"
                placeholder="Note text..."
                value={value}
                onChange={autoResize}
                readOnly={readOnly}
            ></textarea>
        </div>
    );
};

export default Note;
