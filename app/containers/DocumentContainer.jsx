import React from 'react';
import { Button } from 'react-bootstrap';
import Notepad from '../components/Notepad';

export default class AboutPageContainer extends React.Component {
    state = {
        value: `function factorial(n) {
    return n > 1 ? factorial(n - 1) * n : n;
}
factorial(5);`
    }

    handleUpdate(value) {
        this.setState({
            value
        });
    }

    render() {
        return (
            <div>
                <Notepad/>
                {/*<h3 className="page-header">New note</h3>
                <AceEditor
                    editorProps={{cursorStyle: 'wide'}}
                    fontSize={15}
                    height="100"
                    highlightActiveLine={false}
                    maxLines={10}
                    mode="javascript"
                    onUpdate={this.handleUpdate.bind(this)}
                    showGutter={true}
                    theme="tomorrow"
                    value={this.state.value}
                    width="100%"/>
                <br/>*/}
            </div>
        );
    }
}
