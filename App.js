import React, { Component } from 'react'
import { ActivityIndicator, ListView, Text, View, Button } from 'react-native'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default class App extends Component {
 render() {
 	return (
 			<TabNavigatorStack />
 	)
 }
}

class Icon extends Component {
	render() {
		return (<Ionicon name="ios-add" size={30} color="#900" />)
	}
}

class ToursScreen extends Component {

	static navigationOptions = {
		title: 'Tours'
	}

	render() {

		return(
			<View>
				<Icon/>
				<Text>Tours</Text>
				<Button
					title = "Move"
					 onPress={() => {
			            this.props.navigation.navigate('TourDetails', {
			              itemId: 86,
			              other: 'Rentals',
			            })
			          }}
				/>
			</View>
		)
	}
}

class RentalsScreen extends Component {

	static navigationOptions = {
		title: 'Rentals'
    }
	
	render() {
		return (
			<Text>Rentals</Text>
		)
	}
}

class TourModal extends Component {

	render() {

		const { params } = this.props.navigation.state
		const text = params ? params.itemId : 'Nothing Found :('

		return (
			<View>
			<Text>Other Param: { JSON.stringify(text) }</Text>
			<Button
				title = "Close Modal"
				onPress = {() => this.props.navigation.goBack()}
			/>
			</View>
		)
	}
}

class ToursDetailScreen extends Component {
	render() {
		return(
			<Text>Tour Details Here!</Text>
		)
	}
}

const TourNavigatorStack = StackNavigator({
	Tours: {
			screen: ToursScreen
		},
	TourDetails: {
		screen: ToursDetailScreen
	}
})

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
        if (routeName === 'Tours') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Rentals') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }
        return (
        		<Ionicon name={iconName} size={25} color={tintColor} />
        )
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
)


