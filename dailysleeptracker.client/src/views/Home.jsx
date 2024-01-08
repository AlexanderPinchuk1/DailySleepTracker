import { React } from 'react';
import { useNavigate } from "react-router-dom";
import LightButton from '../components/button/LightButton';
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    @media screen and (max-width : 1024px) {
        display: block;
        flex-direction: column;
    }
`

const IconsBlock = styled.div`
    display: flex;
    flex-direction: column;
    width: 25vw;

    @media screen and (max-width : 1024px) {
        display: none;
    }
`

const Icon = styled.img`
    max-height: 190px;
    max-width: 190px;
    padding: 10px;
    margin: auto;
`


const GraphicBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25vw;
    margin: 20px;
    min-width: 300px;

    @media screen and (max-width : 1024px) {
        padding: 50px 0 25px 0;
        width: 90vw;
    }
`

const ImproveSleepText = styled.p`
    font-weight: 500;
    color: white;
    font-size: 36px;
    line-height: 1.0;

    @media screen and (max-width : 1024px) {
        text-align: center;
    }
`

const UnderGraphText = styled.p`
    font-weight: 800;
    color: white;
    font-size: 48px;
    text-align: inherit;
    line-height: 1.0;
    margin: 30px 0 30px 0;

    @media screen and (max-width : 1024px) {
        text-align: center;
    }
`

const ButtonContainer = styled.div`
    margin: 30px 0 30px 0;
    padding: 0 30px 0 30px;
`

const BeneficiarBlock = styled.div`
    width: 30vw;
    text-align: center;
    margin: 20px;
    min-width: 300px;

    @media screen and (max-width : 1024px) {
        width: 90vw;
        padding-top: 50px 0 25px 0;
    }
    @media screen and (max-width : 800px) {
        display: none;
    }
`

const SleepIcon = styled.img`
    height: 450px;
    padding: 10px;
`

const MonitorSleepText = styled.p`
    color: white;
    font-size: 24px;
    text-align: center;
`

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <IconsBlock>
                <Icon alt="zzz" src="./images/zzz.png" />
                <Icon alt="moon" src="./images/moon.png" />
                <Icon alt="sleepwear" src="./images/sleepwear.png" />
                <Icon alt="milk" src="./images/milk.png" />
            </IconsBlock>
            <GraphicBlock>
                <ImproveSleepText>
                    Improve your sleep quality
                </ImproveSleepText>
                <UnderGraphText>
                    Daily Sleep Tracker
                </UnderGraphText>
                <img alt="graph" src="./images/graph.png" />
                <ButtonContainer>
                    <LightButton onClick={() => navigate('/login')}>
                        Start
                    </LightButton>
                </ButtonContainer>
            </GraphicBlock>
            <BeneficiarBlock>
                <SleepIcon alt="sleep" src="./images/sleep.png" />
                <MonitorSleepText>
                    By monitoring your sleep you can check the days you slept poorly, and relate to the events of the day.
                </MonitorSleepText>
            </BeneficiarBlock>
        </Container>
    )
}

export default Home;
