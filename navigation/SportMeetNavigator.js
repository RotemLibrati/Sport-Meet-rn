import React, { useContext } from 'react';
import { Text } from 'react-native';
import CreateNewGame from '../screens/games/CreateNewGame';
import MainScreen from '../screens/MainScreen';
import GamesScreen from '../screens/games/GamesScreen';
import GameDetails from '../components/games/GameDetails';
import TeamDetails from '../components/teams/TeamDetails';
import TeamsScreen from '../screens/teams/TeamsScreen';
import CreateNewTeam from '../components/teams/CreateNewTeam';
import MyProfileScreen from '../screens/profile/MyProfileScreen';
import EditProfile from '../components/profile/EditProfile';
import TeamMessages from '../components/messages/TeamMessages';
import TeamFriends from '../components/teams/TeamFriends';
import DetailsMessage from '../components/messages/DetailsMessage';
import FriendsProfileScreen from '../screens/profile/FriendsProfileScreen';
import PublicGamesScreen from '../screens/games/PublicGamesScreen';
import CreateMessage from '../components/messages/CreateMessage';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { SetToken } from '../context/SetToken';

// const SportMeetNavigator = () => {
//   const { token } = useContext(SetToken);
//   console.log("Token");
//   return;
// };


// const EnterNavigator = createStackNavigator({
//   StartScreen: StartScreen,
//   RegisterScreen: RegisterScreen,
//   LoginScreen: LoginScreen,
// });
const TeamScreen = createStackNavigator({
  TeamScreen: TeamsScreen,
  TeamDetails: TeamDetails,
  CreateNewTeam: CreateNewTeam,
  TeamMessages: TeamMessages,
  CreateMessage: CreateMessage,
  TeamFriends: TeamFriends,
  DetailsMessage: DetailsMessage,
  FriendsProfileScreen: FriendsProfileScreen

});

const MainScreenNavigator = createStackNavigator({
  MainScreen: MainScreen,
  GamesScreen: GamesScreen,
  GameDetails: GameDetails,
  TeamsScreen: TeamsScreen,
  TeamDetails: TeamDetails,
  TeamMessages: TeamMessages,
  CreateMessage: CreateMessage,
  TeamFriends: TeamFriends,
  FriendsProfileScreen: FriendsProfileScreen,
  DetailsMessage: DetailsMessage,
  CreateNewTeam: CreateNewTeam,
  CreateNewGame: CreateNewGame,
  PublicGamesScreen: PublicGamesScreen

});



const ProfileScreenNavigator = createStackNavigator({
  MyProfileScreen: MyProfileScreen,
  EditProfile: EditProfile
});


const SportMeetTabNavigator = createBottomTabNavigator({
  Main: {
    screen: MainScreenNavigator, navigationOptions: {
      tabBarLabel: <Text>ראשי</Text>
    },
  },
  Profile: {
    screen: ProfileScreenNavigator, navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (<AntDesign name="profile" size={24} />);
      },

      tabBarLabel: <Text>פרופיל</Text>
    },

  },

});

const MainNavigation = createDrawerNavigator({
  // ...(token = useContext(SetToken)),
  // Enter: {
  //   screen: EnterNavigator, navigationOptions: {
  //     // drawerLabel: token ? 'התנתקות' : 'כניסה',
  //     // drawerLabel: 'כניסה',
  //     // drawerIcon: <Ionicons name="enter-outline" size={24} color="black" />
  //   }
  // },
  SportMeet: {
    screen: SportMeetTabNavigator
  },
  Main: {
    screen: MainScreenNavigator, navigationOptions: {
      drawerLabel: 'ראשי',
      drawerIcon: <Ionicons name="ios-home-outline" size={24} color="black" />
    }
  },
  Profile: {
    screen: ProfileScreenNavigator, navigationOptions: {
      drawerLabel: 'פרופיל',
      drawerIcon: <AntDesign name="profile" size={24} color="black" />
    }
  },

  TeamScreen: {
    screen: TeamScreen, navigationOptions: {
      drawerLabel: 'הקבוצות שלי',
      drawerIcon: <FontAwesome name="group" size={24} color="black" />,
    }

  }
},
  {
    contentOptions: {
      activeTintColor: 'orange',
    }
  }

);

export default createAppContainer(MainNavigation);