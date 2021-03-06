import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import API from '../../ApiService';
import axios from 'axios';
import { SetToken } from '../../context/SetToken';
import Loading from '../../components/Loading';
import GameFieldList from '../../components/gamefield/GameFieldList';

const CreateNewGamePage2 = props => {
    const { token } = useContext(SetToken);
    const game = props.navigation.getParam("game", null);
    const date = props.navigation.getParam("date", null);
    const time = props.navigation.getParam("time", null);
    const limitParticipants = props.navigation.getParam("limitParticipants", null);
    const team = props.navigation.getParam("team", null);
    let typeSport = props.navigation.getParam("type", null);
    if (!typeSport){
        typeSport="כדורגל";
    }
    const city = props.navigation.getParam("city", null);
    const typeTeam = props.navigation.getParam("typeTeam", null);
    const editGame = props.navigation.getParam("editGame", null);
    const [isLoading, setIsLoading] = useState(true);
    const [gameField, setGameField] = useState([]);
    const [teamObject, setTeamObject] = useState();

    useEffect(() => {
        const fetchTeam = async () => {
            let config = {
                method: 'get',
                url: `${API.ipAddress}/team/${team}/`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            await axios(config)
                .then(function (response) {
                    console.log(response.data.team.sport);
                    typeSport = response.data.team.sport;
                    setTeamObject(response.data.team);
                    fetchGameField();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        const fetchGameField = async () => {
            let config = {
                method: 'get',
                url: `${API.ipAddress}/type/${city}/${typeSport}/`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            await axios(config)
                .then(function (response) {
                    setGameField(response.data);
                    console.log(response.data);
                    setIsLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        if (team){
            fetchTeam();
        } else {
            fetchGameField();
        }
        
    }, [])
    return (
        isLoading ? (<Loading />) : (
            game ? (<GameFieldList gameField={gameField} date={date} time={time}
                type={typeSport} limitParticipants={limitParticipants} team={team} teamObject={teamObject} navigation={props.navigation} editGame={editGame} game={game}/>) :(
            <GameFieldList gameField={gameField} date={date} time={time}
                type={typeSport} limitParticipants={limitParticipants} team={team} teamObject={teamObject} navigation={props.navigation} editGame={editGame} typeTeam={typeTeam}/>)
        )
    )
};

CreateNewGamePage2.navigationOptions = (navData) => {
    return {
        headerTitle: "בחר מגרש"
    }
};

export default CreateNewGamePage2;