'use strict';

import React from 'react';
import {
    AppRegistry,
    StyleSheet
} from 'react-native';


class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        
    }

    render() {
        return (
            <View style={[styles.container, { flexDirection: 'column', alignItems: 'center' }]}>
            </View>
        )
    }
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    }
});

AppRegistry.registerComponent('detail_page', () => DetailPage);
