import React, { Component } from "react";
import {
	StyleSheet,
	ActivityIndicator,
	ListView,
	Text,
	View,
	Button
} from "react-native";
import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import Ionicon from "react-native-vector-icons/Ionicons";

export default class App extends Component {
	render() {
		return <TabNavigatorStack style={styles.nav} />;
	}
}

class Icon extends Component {
	render() {
		return <Ionicon name="ios-add" size={30} color="#900" />;
	}
}

class ToursScreen extends Component {
	render() {
		return (
			<View>
				<Icon />
				<Text>Tours</Text>
				<Button
					title="Move"
					onPress={() => {
						this.props.navigation.navigate("TourDetails", {
							itemId: 86,
							other: "Rentals"
						});
					}}
				/>
			</View>
		);
	}
}

class RentalsScreen extends Component {
	constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
      error: null
    }
  }

  componentDidMount() {
    return fetch('http://ghoomakad.atwebpages.com/ghoomakad/gh-clogs/make-rental-data.php')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        this.setState({
        	isError : true,
        	error: 'Seems like a Network Error occured.'
        })
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    else if (this.state.isError) {
    	return(
    		<View>
    			<Text> {this.state.error} </Text>
    		</View>
    	)
    }
    else {
    	return (
	      <View style={{flex: 1, paddingTop: 20}}>
	        <ListView
	          dataSource={this.state.dataSource}
	          renderRow={(rowData) => <Text>{rowData.rentalName}, {rowData.rentalPrice}</Text>}
	        />
	      </View>
    );

    }

  }
}



class TourModal extends Component {
	render() {
		const { params } = this.props.navigation.state;
		const text = params ? params.itemId : "Nothing Found :(";

		return (
			<View>
				<Text>Other Param: {JSON.stringify(text)}</Text>
				<Button
					title="Close Modal"
					onPress={() => this.props.navigation.goBack()}
				/>
			</View>
		);
	}
}

class ToursDetailScreen extends Component {
	render() {
		return <Text>Tour Details Here!</Text>;
	}
}

const TourNavigatorStack = StackNavigator({
	Tours: {
		screen: ToursScreen
	},
	TourDetails: {
		screen: ToursDetailScreen
	}
});

const TabNavigatorStack = TabNavigator(
	{
		Tours: {
			screen: TourNavigatorStack
		},
		Rentals: {
			screen: RentalsScreen
		}
	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;
				if (routeName === "Tours") {
					iconName = `ios-information-circle${focused ? "" : "-outline"}`;
				} else if (routeName === "Rentals") {
					iconName = `ios-options${focused ? "" : "-outline"}`;
				}
				return <Ionicon name={iconName} size={30} color={tintColor} />;
			}
		}),
		tabBarOptions: {
			activeTintColor: "tomato",
			inactiveTintColor: "gray",
			labelStyle: {
				/* tab label styles */
				fontSize: 12,
				paddingTop: 0,
				letterSpacing: 1
			},
			tabStyle: {
				/* tab styles */
			},
			style: {
				/* tab bar styles */
			}
		},
		tabBarComponent: TabBarBottom,
		tabBarPosition: "bottom",
		animationEnabled: false,
		swipeEnabled: true,
		lazy: true
	}
);

const styles = StyleSheet.create({
	nav: {
		height: 300
	}
});
