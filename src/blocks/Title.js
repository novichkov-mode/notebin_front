import '../css/App.css'
import React from "react";

class Title extends React.Component {
    render() {
        return (
            <div className='container' style={{ margin: 'auto' }}>
                <div className="title-container">
                    <textarea
                        maxLength="140"
                        rows="1"
                        id="title"
                        placeholder="Title..."
                        value={this.props.value}
                        onChange={this.props.onChange}
                        readOnly={this.props.readOnly}
                    ></textarea>
                </div>
            </div>
        );
    }
}

export default Title;