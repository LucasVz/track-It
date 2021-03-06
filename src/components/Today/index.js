import Top from "../Top";
import Menu from "../Menu"
import axios from 'axios';
import { useEffect, useState } from 'react';
import CompleteHabits from "../CompleteHabits";
import dayjs from "dayjs";
import 'dayjs/locale/pt'
import styled from 'styled-components';
import { useContext } from "react";
import UserContext from '../../context/UserContext'

export default function Today(){
    const { token, user, percent, setPercent } = useContext(UserContext);
    const [habit, setHabit] = useState(null);
    const [ativar, setAtivar] = useState('');
    let cont = 0;
    function teste(){
        for(let i = 0; i < habit.length; i++){
            if(habit[i].done === true){
                cont++
            }
        }
        setPercent(Math.floor(cont/(habit.length)*100));
    }
    useEffect(() => {
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        promise.then(response => setHabit(response.data));
        promise.catch(error => console.log(error.response));
    }, [ativar]);

    if (habit === null) {
        return <h1>Carregando...</h1>
    }
    teste()
    return(
        <>
        <Top user = {user}/>
        <Container>
            <Data>{dayjs().locale('pt').format('dddd, MM/DD')}</Data>
            <p className={`${(percent !== 0) && "text-green"} habit-states`}>{(percent !== 0)?`${percent}% dos habitos concluidos`:"Nenhum hábito concluído ainda"}</p>
            {habit.map( habits => (
                <CompleteHabits {...habits} setAtivar = {setAtivar} habit = {habit} setHabit = {setHabit} />
            ))}
        </Container >
        <Menu />
        </>
    );
}

const Data = styled.div`
    font-size: 23px;
    color: #126BA5;
    margin-top: 28px;
    margin-bottom: 5px;
`

const Container = styled.div`
    margin: 0 18px;
    padding-top: 80px;
    padding-bottom: 80px;
    .habit-states{
        font-size: 18px;
        color: #BABABA;

        margin-bottom: 28px;
    }
    .text-green{
        color: #8FC549;
    }
`