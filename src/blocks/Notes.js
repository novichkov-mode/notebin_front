import React from "react";
import {Link} from "react-router-dom";
import { FaRegEye } from "react-icons/fa";


function truncateStringByWords(text, maxLength = 125) {
    if (text.length <= maxLength) {
        return text;
    }

    const trimmedText = text.slice(0, maxLength);
    const lastSpaceIndex = trimmedText.lastIndexOf(' ');

    if (lastSpaceIndex > 0) {
        return trimmedText.slice(0, lastSpaceIndex) + '...';
    }

    return trimmedText + '...';
}


class Notes extends React.Component {

    render() {
        return (
            <div className="container my-5">
                {this.props.notes.length > 0 ? (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                        {this.props.notes.map((note) => (
                            <div key={note.id} className="col">
                                <div className="card text-white bg-dark mb-3" style={{height: '210px', cursor: 'pointer'}}>
                                    <div className="card-header text-end">
                                        <div className='container' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                            <div>
                                                <FaRegEye />
                                                {/*TODO вставить кол-во просмотров у заметки*/}
                                                {/*{note.views}*/}
                                            </div>
                                            {note.createAt}
                                        </div>
                                    </div>
                                        <div className="card-body">
                                            <h2 className="card-title">{note.title}</h2>
                                            <p className="card-text" style={{ textAlign: 'justify' }}>{truncateStringByWords(note.noteText)}</p>
                                        </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-info text-center" role="alert">
                        Заметок еще нет.{" "}
                        <Link to="/create" style={{textDecoration: "underline"}}>
                            Создайте новую
                        </Link>
                        , чтобы она отображалась здесь.
                    </div>
                )}
            </div>
        );
    }
}

export default Notes;