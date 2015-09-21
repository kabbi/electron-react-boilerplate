import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default class AppContainer extends React.Component {
    static propTypes = {
        children: React.PropTypes.node.isRequired
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={10} xsOffset={1}>
                        {this.props.children}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
