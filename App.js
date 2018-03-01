import React, { Component } from "react";
import {
	StyleSheet,
	ActivityIndicator,
	ListView,
	Text,
	View,
	Button,
	Image,
	FlatList,
	ScrollView,
	Alert
} from "react-native";
import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import Ionicon from "react-native-vector-icons/Ionicons";
import {
	MKButton,
	MKColor,
	MKIconToggle,
	getTheme
} from "react-native-material-kit";
import Timeline from 'react-native-timeline-listview'

class Icon extends Component {
	render() {
		return <Ionicon name={this.props.name} size={30} color="#900" />;
	}
}

class ToursScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isError: false,
			error: "Seems like a Network Error Occured!",
			isLoading: true,
			dataSource: { a: "asd" }
		};
	}

	static navigationOptions = {
		header: null
	};

	/*	componentDidMount() {
		return fetch(
			"http://ghoomakad.atwebpages.com/ghoomakad/gh-clogs/make-tours-data.php"
		)
			.then(response => response.json())
			.then(responseJson => {
				let ds = new ListView.DataSource({
					rowHasChanged: (r1, r2) => r1 !== r2
				});
				this.setState(
					{
						isLoading: false,
						dataSource: ds.cloneWithRows(responseJson)
					},
					function() {
						// do something with new state
					}
				);
			})
			.catch(error => {
				this.setState({
					isError: true,
					error: "Seems like a Network Error occured."
				});
			});
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={{ flex: 1, paddingTop: 20 }}>
					<ActivityIndicator />
				</View>
			);
		} else if (this.state.isError) {
			return (
				<View>
					<Text> {this.state.error} </Text>
				</View>
			);
		} else {
			return (
				<View style={{ flex: 1, padding: 10 }}>
					<ListView
						dataSource={this.state.dataSource}
						renderRow={rowData => (
							<TourWidget
								isActive={rowData.isActive}
								image={rowData.tourCoverImage}
								price={rowData.id}
								name={rowData.tourName}
							/>
						)}
					/>
				</View>
			);
		}
	}*/

	render() {
		return (
			<View style={{ flex: 1 }}>
				<FlatList
					data={[{ key: "a" }]}
					renderItem={rowData => (
						<TourWidget
							isActive={rowData.isActive}
							image={rowData.tourCoverImage}
							price={rowData.id}
							name={rowData.tourName}
							navigate={this.props.navigation}
						/>
					)}
				/>
			</View>
		);
	}
}

class TourWidget extends Component {
	render() {
		const base =
			"https://cdn1.tripoto.com/media/filter/nl/img/1/Image/1503640880_6641038395_baa15ebb33_n.jpg";

		var base64Icon = "http://www.getmdl.io/assets/demos/welcome_card.jpg";
		var action = <Text> My action</Text>;
		var menu = (
			<MKIconToggle
				checked={true}
				onCheckedChange={this._onIconChecked}
				onPress={this._onIconClicked}
			>
				<Text pointerEvents="none" style={styles.toggleTextOff}>
					Off
				</Text>
				<Text
					state_checked={true}
					pointerEvents="none"
					style={[styles.toggleText, styles.toggleTextOn]}
				>
					On
				</Text>
			</MKIconToggle>
		);
		const FlatButton = MKButton.coloredFlatButton()
			.withText("Tour Details")
			.withOnPress(() => {
				this.props.navigate.navigate("TourDetails", {
					id : 11
				});
			})
			.build();
		const FlatButton2 = MKButton.coloredButton()
			.withText("Book")
			.build();

		return (
			<View>
				<View style={[theme.cardStyle, { marginBottom: 5 }]}>
					<Image
						source={{ uri: base64Icon }}
						style={theme.cardImageStyle}
					/>
					<Text
						style={[
							theme.cardTitleStyle,
							{
								backgroundColor: "purple",
								color: "#fff",
								maxWidth: "90%",
								fontSize: 20
							}
						]}
					>
						Rajasthan Awesome tour
					</Text>
					<View // TextView padding not handled well on Android https://github.com/facebook/react-native/issues/3233
						style={{
							padding: 15
						}}
					>
						<Text style={[theme.cardContentStyle, { padding: 0 }]}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Mauris sagittis pellentesque lacus eleifend lacinia...
						</Text>
					</View>
					<View style={[theme.cardActionStyle, styles.btnView]}>
						<FlatButton style={styles.detailBtn} />
						<FlatButton2 style={styles.detailBtn} />
					</View>
				</View>
				<View style={theme.cardStyle}>
					<Image source={{ uri: base }} style={theme.cardImageStyle} />
					<Text
						style={[
							theme.cardTitleStyle,
							{
								backgroundColor: "purple",
								color: "#fff",
								maxWidth: "90%",
								fontSize: 20
							}
						]}
					>
						Rajasthan Awesome tour
					</Text>
					<View // TextView padding not handled well on Android https://github.com/facebook/react-native/issues/3233
						style={{
							padding: 15
						}}
					>
						<Text style={[theme.cardContentStyle, { padding: 0 }]}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Mauris sagittis pellentesque lacus eleifend lacinia...
						</Text>
					</View>
					<View style={[theme.cardActionStyle, styles.btnView]}>
						<FlatButton style={styles.detailBtn} />
						<FlatButton2 style={styles.detailBtn} />
					</View>
				</View>
			</View>
		);
	}
}
class RentalWidget extends Component {
	render() {
		const base =
			"https://auto.ndtvimg.com/bike-images/colors/suzuki/intruder/suzuki-intruder-glass-sparkle-black.png";

		if (this.props.isActive == 1) {
			return (
				<View style={styles.container}>
					<View style={styles.leftContainer}>
						<Image style={styles.rentalImage} source={{ uri: base }} />
					</View>
					<View style={styles.rightContainerWithText}>
						<View>
							<Text style={styles.textUpper}>{this.props.name}</Text>
						</View>
						<View>
							<Text style={styles.textLower}>
								<Text style={styles.currency}>&#x20B9;</Text>
								{this.props.price}
							</Text>
						</View>
					</View>
				</View>
			);
		}
		return null;
	}
}
class RentalsScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			isError: false,
			error: null
		};
	}

	componentDidMount() {
		return fetch(
			"http://ghoomakad.atwebpages.com/ghoomakad/gh-clogs/make-rental-data.php"
		)
			.then(response => response.json())
			.then(responseJson => {
				let ds = new ListView.DataSource({
					rowHasChanged: (r1, r2) => r1 !== r2
				});
				this.setState(
					{
						isLoading: false,
						dataSource: ds.cloneWithRows(responseJson)
					},
					function() {
						// do something with new state
					}
				);
			})
			.catch(error => {
				this.setState({
					isError: true,
					error: "Seems like a Network Error occured."
				});
			});
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={{ flex: 1, paddingTop: 20 }}>
					<ActivityIndicator />
				</View>
			);
		} else if (this.state.isError) {
			return (
				<View>
					<Text> {this.state.error} </Text>
				</View>
			);
		} else {
			return (
				<View style={{ flex: 1, padding: 10 }}>
					<ListView
						dataSource={this.state.dataSource}
						renderRow={rowData => (
							<RentalWidget
								isActive={rowData.isActive}
								image={rowData.rentalImage}
								price={rowData.rentalPrice}
								name={rowData.rentalName}
							/>
						)}
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

	constructor(props) {
		super(props)
		this.data = [
	      {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
	      {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
	      {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
	      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
	      {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
      ]

      this.state = {
      	isError: false,
      	isLoading: true,
      }
	}

	componentDidMount() {
		return fetch(
			'http://ghoomakad.atwebpages.com/ghoomakad/gh-clogs/make-tour-day-data.php?id='+this.props.navigation.state.params.id
		)
		.then((response) => response.json())
		.then((jsonResponse) => {

			let dayData = []
			let i = 1;
				
			jsonResponse.forEach((item) => {
				let day = {
					time : 'Day-'+i,
					title: item.dayDestination,
					description: item.tourDayDetail
				}
				dayData.push(day)
				i++
			})

			this.setState({
				isLoading: false,
				data: dayData
			})
					console.log(this.state.data)
		})
		.catch((error) => {
			this.setState({
				isError: true,
				error: 'Seems like a Network Error Occured'
			})
		})	
	}
	render() {
		
		if (this.state.isLoading) {
			return (
				<ActivityIndicator />
			)
		}

		 return (
		
      <View style={styles.container}>
        <Timeline 
          style={styles.list}
          data={this.state.data}
        />
      </View>
)
;	}
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

const theme = getTheme();
const styles = StyleSheet.create({
	nav: {
		height: 300
	},
	textElement: {
		fontFamily: "Roboto",
		fontSize: 18
	},
	container: {
		flex: 1,
		flexDirection: "row",
		width: "100%",
		marginBottom: 5
	},
	leftContainer: {
		width: "30%"
	},
	rightContainerWithText: {
		padding: 10
	},
	rentalImage: {
		height: 70,
		width: "100%"
	},
	textUpper: {
		fontSize: 20
	},
	textLower: {
		fontSize: 18
	},
	currency: {
		fontSize: 14
	},
	tourHeaderContainer: {
		height: 170,
		width: "100%"
	},
	tourContainer: {
		height: 150,
		marginBottom: 5
	},
	tourImageContainer: {
		height: "100%",
		width: "100%"
	},
	tourImage: {
		height: "100%",
		width: "100%"
	},
	tourTextHeading: {
		position: "absolute",
		bottom: 10,
		left: 10
	},
	btnView: {
		flex: 1,
		flexDirection: "row"
	},
	detailBtn: {
		marginRight: 5,
		paddingTop: 8,
		paddingRight: 15,
		paddingLeft: 15,
		paddingBottom: 8
	}
});

export default class App extends Component {
	render() {
		return <TabNavigatorStack style={styles.nav} />;
	}
}
