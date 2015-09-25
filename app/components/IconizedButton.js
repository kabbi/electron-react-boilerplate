import React from 'react';
import { OverlayTrigger, Button, Glyphicon, Tooltip } from 'react-bootstrap';

export default class CodeCell extends React.Component {
    static propTypes = {
        icon: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired,
    }

    render() {
        return (
            <OverlayTrigger placement="bottom" overlay={<Tooltip>{this.props.label}</Tooltip>}>
                <Button bsStyle="link" bsSize="xsmall" onClick={this.props.onClick}>
                    <Glyphicon glyph={this.props.icon}/>
                </Button>
            </OverlayTrigger>
        );
    }
}
