import React from 'react';
import ace from 'brace';

export default class AceEditor extends React.Component {
    static propTypes = {
        className: React.PropTypes.string,
        cursorStart: React.PropTypes.number,
        editorProps: React.PropTypes.object,
        firstLineNumber: React.PropTypes.number,
        fontSize: React.PropTypes.number,
        height: React.PropTypes.string,
        highlightActiveLine: React.PropTypes.bool,
        maxLines: React.PropTypes.number,
        minLines: React.PropTypes.number,
        mode: React.PropTypes.string,
        name: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onLoad: React.PropTypes.func,
        onPaste: React.PropTypes.func,
        readOnly: React.PropTypes.bool,
        showGutter: React.PropTypes.bool,
        showPrintMargin: React.PropTypes.bool,
        theme: React.PropTypes.string,
        value: React.PropTypes.string,
        width: React.PropTypes.string
    }

    static defaultProps = {
        name: 'brace-editor',
        mode: '',
        theme: '',
        height: '500px',
        width: '500px',
        value: '',
        firstLineNumber: 1,
        fontSize: 12,
        showGutter: true,
        onChange: null,
        onPaste: null,
        onLoad: null,
        maxLines: null,
        minLines: null,
        readOnly: false,
        highlightActiveLine: true,
        showPrintMargin: true,
        cursorStart: 1,
        editorProps: {}
    }

    state = {
        leftMargin: 2
    }

    handleChange() {
        var value = this.editor.getValue();
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    handlePaste(text) {
        if (this.props.onPaste) {
            this.props.onPaste(text);
        }
    }

    componentDidMount() {
        this.editor = ace.edit(this.props.name);
        this.editor.$blockScrolling = Infinity;

        this.editor.setOptions(this.props.editorProps);

        this.editor.getSession().setMode('ace/mode/' + this.props.mode);
        this.editor.setTheme('ace/theme/' + this.props.theme);
        this.editor.setFontSize(this.props.fontSize);
        this.editor.on('change', ::this.handleChange);
        this.editor.on('paste', ::this.handlePaste);
        this.editor.setValue(this.props.value, this.props.cursorStart);
        this.editor.renderer.setShowGutter(this.props.showGutter);
        this.editor.setOption('maxLines', this.props.maxLines);
        this.editor.setOption('minLines', this.props.minLines);
        this.editor.setOption('readOnly', this.props.readOnly);
        this.editor.setOption('highlightActiveLine', this.props.highlightActiveLine);
        this.editor.setOption('highlightGutterLine', this.props.highlightActiveLine);
        this.editor.getSession().setOption('firstLineNumber', this.props.firstLineNumber);

        this.editor.renderer.on('resize', () => {
            let leftMargin = 2;
            if (this.props.showGutter) {
                leftMargin += this.editor.renderer.gutterWidth;
            }
            this.setState({leftMargin});
        });

        if (this.props.onLoad) {
            this.props.onLoad(this.editor);
        }
    }

    componentWillUnmount() {
        this.editor.destroy()
        this.editor = null;
    }

    componentWillReceiveProps(nextProps) {
        this.editor.getSession().setOption('firstLineNumber', nextProps.firstLineNumber);
        // this.editor = ace.edit(nextProps.name);
        // this.editor.getSession().setMode('ace/mode/' + nextProps.mode);
        // this.editor.setTheme('ace/theme/' + nextProps.theme);
        // this.editor.setFontSize(nextProps.fontSize);
        // this.editor.setOption('maxLines', nextProps.maxLines);
        // this.editor.setOption('minLines', nextProps.minLines);
        // this.editor.setOption('readOnly', nextProps.readOnly);
        // this.editor.setOption('highlightActiveLine', nextProps.highlightActiveLine);
        // this.editor.setOption('highlightGutterLine', this.props.highlightActiveLine);
        // this.editor.setShowPrintMargin(nextProps.setShowPrintMargin);
        // this.editor.setOptions(nextProps.editorProps);
        //
        // if (this.editor.getValue() !== nextProps.value) {
        //     this.editor.setValue(nextProps.value, nextProps.cursorStart);
        // }
        //
        // this.editor.renderer.setShowGutter(nextProps.showGutter);
        // if (nextProps.onLoad) {
        //     nextProps.onLoad(this.editor);
        // }
    }

    render() {
        return (
            <div
                id={this.props.name}
                className={this.props.className}
                onChange={::this.handleChange}
                onPaste={::this.handlePaste}
                style={{
                    width: `calc(100% + ${this.state.leftMargin}px)`,
                    height: 100,
                    position: 'relative',
                    marginLeft: -this.state.leftMargin
                }}>
            </div>
        );
    }
}
