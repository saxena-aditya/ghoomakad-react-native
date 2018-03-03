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
import Timeline from "react-native-timeline-listview";
import { Bars } from "react-native-loader";


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

	componentDidMount() {
		return fetch(
			"http://ghoomakad.atwebpages.com/ghoomakad/gh-clogs/make-tours-data.php"
		)
			.then(response => response.json())
			.then(responseJson => {
				let data = [];
				responseJson.forEach(item => {
					let tour = {
						id: item.id,
						name: item.tourName,
						description: item.tourSubText,
						days: item.tourDuration,
						image: item.tourCoverImage
					};

					data.push(tour);
				});

				this.setState(
					{
						isLoading: false,
						dataSource: data
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
				<View style={styles.loaderView}>
					<Bars size={20} color="e91e63" />
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
				<View style={{ flex: 1 }}>
					<FlatList
						data={this.state.dataSource}
						renderItem={rowData => (
							<TourWidget
								id={rowData.item.id}
								image={rowData.item.image}
								days={rowData.item.days}
								name={rowData.item.name}
								desc={rowData.item.description}
								navigate={this.props.navigation}
							/>
						)}
					/>
				</View>
			);
		}
	}
	/*
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
	}*/
}

class TourWidget extends Component {
	render() {
		const base =
			"https://cdn1.tripoto.com/media/filter/nl/img/1/Image/1503640880_6641038395_baa15ebb33_n.jpg";

		var base64Icon = "http://www.getmdl.io/assets/demos/welcome_card.jpg";
		const FlatButton = MKButton.coloredFlatButton()
			.withText("Tour Details")
			.withTextStyle({
				color: "#0a7aad",
				fontFamily: "Lato-Regular",
				fontSize: 15
			})
			.withOnPress(() => {
				this.props.navigate.navigate("TourDetails", {
					id: this.props.id,
					name : this.props.name,
					desc : this.props.desc
			});
			})
			.build();
		const FlatButton2 = MKButton.accentColoredButton()
			.withText("Book")
			.withTextStyle({
				color: "#ffffff",
				fontFamily: "Lato-Regular",
				fontSize: 15
			})

			.build();

		return (
			<View style={[theme.cardStyle, { marginBottom: 10 }]}>
				<Image source={{ uri: base }} style={theme.cardImageStyle} />
				<Text
					style={[
						theme.cardTitleStyle,
						{
							backgroundColor: "#26619ced",
							color: "#fff",
							maxWidth: "90%",
							fontSize: 20,
							fontFamily: "Lato-Regular",
							fontWeight: "200"
						}
					]}
				>
					{this.props.name}
				</Text>
				<View // TextView padding not handled well on Android https://github.com/facebook/react-native/issues/3233
					style={{
						padding: 15
					}}
				>
					<Text
						style={[
							theme.cardContentStyle,
							{ padding: 0, fontFamily: "Lato-Regular" }
						]}
					>
						{this.props.desc.substring(0, 150) + "[...]"}
					</Text>
				</View>
				<View style={[theme.cardActionStyle, styles.btnView]}>
					<FlatButton style={styles.detailBtn} />
					<FlatButton2 style={styles.detailBtn} />
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
				<View style={[theme.cardStyle, { marginBottom: 10 }]}>
				<Image source={{ uri: base }} style={theme.cardImageStyle} />
				<Text
					style={[
						theme.cardTitleStyle,
						{
							backgroundColor: "#ffffffbe",
							color: "#000",
							maxWidth: "90%",
							fontSize: 20,
							fontFamily: "Lato-Regular",
							fontWeight: "300"
						}
					]}
				>
					{this.props.name}
				</Text>
				<View // TextView padding not handled well on Android https://github.com/facebook/react-native/issues/3233
					style={{
						padding: 15
					}}
				>
					<Text
						style={[
							theme.cardContentStyle,
							{ padding: 0, fontFamily: "Lato-Regular", fontSize: 25 }
						]}
					>
						<Text
							style={{fontSize: 20, marginRight: 10}}
						>&#8377;</Text>{this.props.price + "/-"}
					</Text>
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
				<View style={styles.loaderView}>
					<Bars size={20} color="e91e63" />
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
					<Text
						style={{fontFamily:'Lato-Regular', fontSize:15, color:'#000'}}
					>**All the prices mentioned above are on per-day basic.</Text>
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
	static navigationOptions = {
		title: "Tour Details",
		headerTitleStyle: {
			fontWeight: "normal",
			fontFamily: "Lato-Regular"
		}
	};
	constructor(props) {
		super(props);
		this.state = {
			isError: false,
			isLoading: true
		};
	}

	componentDidMount() {
		return fetch(
			"http://ghoomakad.atwebpages.com/ghoomakad/gh-clogs/make-tour-day-data.php?id=" +
				this.props.navigation.state.params.id
		)
			.then(response => response.json())
			.then(jsonResponse => {
				let dayData = [];
				let i = 1;

				jsonResponse.forEach(item => {
					let day = {
						time: "Day-" + i,
						title: item.dayDestination,
						description: item.tourDayDetail
					};
					dayData.push(day);
					i++;
				});

				this.setState({
					isLoading: false,
					data: dayData,
				
				});
			})
			.catch(error => {
				this.setState({
					isError: true,
					error: "Seems like a Network Error Occured"
				});
			});
	}
	render() {
		if (this.state.isLoading) {
			return (
				<View style={styles.loaderView}>
					<Bars size={20} color="e91e63" />
				</View>
			);
		}
		return (
			<ScrollView>
			<View style={[styles.container], {marginLeft: 5}}>
			<View>
			<Text style={styles.heading}>{this.props.navigation.state.params.name}</Text>
			<Text style={styles.desc}>
				{this.props.navigation.state.params.desc}
			</Text>
			</View>
				<Timeline
					style={styles.list}
					data={this.state.data}
					circleSize={20}
					titleStyle={{
						fontFamily: "Lato-Semibold",
						fontWeight: "normal",
						color: "#000"
					}}
					circleColor="rgb(45,156,219)"
					lineColor="rgb(45,156,219)"
					timeContainerStyle={{
						minWidth: 56,
						marginTop: 5,
						marginLeft: 5
					}}
					timeStyle={{
						textAlign: "center",
						backgroundColor: "#009e60",
						color: "white",
						padding: 5,
						borderRadius: 13
					}}
					descriptionStyle={{
						color: "#6d6262",
						fontWeight: "normal",
						fontFamily: "Lato Light"
					}}
					innerCircle={"dot"}
					options={{
						style: { paddingTop: 10 }
					}}
				/>
			</View>
			</ScrollView>
		);
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
					iconName = `ios-information-circle${
						focused ? "" : "-outline"
					}`;
				} else if (routeName === "Rentals") {
					iconName = `ios-options${focused ? "" : "-outline"}`;
				}
				return <Ionicon name={iconName} size={30} color={tintColor} />;
			}
		}),
		tabBarOptions: {
			activeTintColor: "#e91e63",
			inactiveTintColor: "gray",
			labelStyle: {
				/* tab label styles */
				fontSize: 12,
				paddingTop: 0,
				letterSpacing: 1,
				fontFamily: 'Lato-Regular',
				fontWeight: '400'
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
		fontFamily: "Lato",
		fontSize: 18
	},
	container: {
		flex: 1,
		width: "100%",
		marginBottom: 5
	},
	rentalContainer: {
		flex: 1,
		width: '100%',
		flexDirection:'row'
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
	},
	loaderView: {
		flex: 1,
		paddingTop: "50%",
		backgroundColor: "#fff",
		alignItems: "center"
	},
	heading: {
		paddingTop: 16,
		paddingLeft: 5,
		fontSize: 25,
		color: '#000',
		fontFamily: 'Lato-Regular',
		fontWeight: 'normal'
	},
	desc: {
		paddingBottom: 10,
		paddingLeft: 5,
		paddingRight: 10,
		paddingTop: 5,
		color: '#6d6262',
		fontSize: 15,
		fontFamily: 'Lato-Regular',
		fontWeight: '300'
	}

});

export default class App extends Component {
	render() {
		return <TabNavigatorStack style={styles.nav} />;
	}
}
