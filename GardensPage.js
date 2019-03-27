'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator,
    Image,
} from 'react-native';

type Props = {};

//------ Gardens Page --------//
export default class GardensPage extends Component<Props> {

    //- details of the navigation bar on this page
    static navigationOptions = {
        title: 'My Gardens',
    };

    //- initial state of the page
constructor(props) {
    super(props);
    this.state = {
        //- setting page settings
        searchString: 'london',
        isLoading: false,
        message: '',
    };
}

//- even handlers for page (must define when making object)
_onSearchTextChanged = (event) => {
    console.log('_onSearchTextChanged');
    this.setState({ searchString: event.nativeEvent.text });
    console.log('Current: '+this.state.searchString+', Next: '+event.nativeEvent.text);
};

_executeQuery = (query) => {
    console.log(query);
    this.setState({ isLoading: true });
    fetch(query)
        .then(response => response.json())
    .then(json => this._handleResponse(json.response))
    .catch(error =>
    this.setState({
        isLoading: false,
        message: 'Something bad happened ' + error
    }));

};

_onSearchPressed = () => {
    const query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
};

_handleResponse = (response) => {
    this.setState({ isLoading: false , message: '' });
    if (response.application_response_code.substr(0, 1) === '1') {
        this.props.navigation.navigate(
            'PlantsPage', {listings: response.listings});    } else {
        this.setState({ message: 'Location not recognized; please try again.'});
    }
};



//- what will show on the page
render() {
    const spinner = this.state.isLoading ?
<ActivityIndicator size='large'/> : null;
    return (
        <View style={styles.container}>
        <Text style={styles.description}>
        Add your gardens here!
    </Text>
    <Text style={styles.description}>
        Coming soon...
    </Text>
    <View style={styles.flowRight}>
        <TextInput
    underlineColorAndroid={'transparent'}
    style={styles.searchInput}
    value={this.state.searchString}
    placeholder='This is temporary...'
    onChange={this._onSearchTextChanged}/>
        <Button
    onPress={this._onSearchPressed}
    color='#48BBEC'
    title='Go'
        />
        </View>
    {spinner}
    <Text style={styles.description}>{this.state.message}</Text>
        </View>

);
}
}

//--------- Query function ----------------//
function urlForQueryAndPage(key, value, pageNumber) {
    const data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber,
    };
    data[key] = value;

    const querystring = Object.keys(data)
        .map(key => key + '=' + encodeURIComponent(data[key]))
.join('&');

    return 'https://api.nestoria.co.uk/api?' + querystring;
}



//--------- Styles for this page -----------//

const styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
});
