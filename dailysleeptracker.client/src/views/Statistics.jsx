import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import NewEntryButton from '../components/button/NewEntryButton';
import SleepEntryModal from '../components/modals/SleepEntryModal';
import DayStatisticsChart from '../components/charts/DayStatisticsChart';
import WeekStatisticsChart from '../components/charts/WeekStatisticsChart'
import MonthStatisticsChart from '../components/charts/MonthStatisticsChart'    ;
import YearStatisticsChart from '../components/charts/YearStatisticsChart';
import DayStatisticsCard from '../components/cards/DayStatisticsCard';
import WeekAndMonthStatisticsCard from '../components/cards/WeekAndMonthStatisticsCard';
import YearStatisticsCard from '../components/cards/YearStatisticsCard';
import { getFullStatisticsOrReturnNullAsync } from '../api/sleepStatisticsAPI';

const Container = styled.div`
    width: 100%;
    margin: 25px 0 25px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    body{
        background-color: red !important;
    }

    @media screen and (max-width : 1280px) {
        margin: 20px 0 20px 0;
    }
`

const Block = styled.div`
    margin: auto;
    width: 80%;
    background-color: white;
    border-radius: 8px;
    box-shadow: 10px 10px 0 #ffa50099;
    
    @media screen and (max-width : 1024px) {
         width: 95%;
         min-width: 350px;
    }
`

const Header = styled.p`
    font-size: 36px;
    margin: 30px 0 30px 0;
    text-align: center;
` 

const GridBox = styled.div`
    width: 100%;    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin: 35px 0 35px 0;

    @media screen and (max-width : 1024px) {
        grid-template-columns: 150px 150px;
        justify-content: space-evenly;
    }
`

const ChartContainer = styled.div`
    width: 70%;
    height: 400px;
    float: left;
    margin: 0 0 20px 0;

    @media screen and (max-width : 1280px) {
        width : 100%;
    }
`

const DateContainer = styled.div`
    width: 50%;
    margin: auto 0 auto 0;
    padding: 0 150px 0 150px;
    min-width: 100px;

    @media screen and (max-width : 1280px) {
        padding: 0 100px 0 100px;
    }

    @media screen and (max-width : 800px) {
        padding: 0 50px 0 50px;
    }

    @media screen and (max-width : 480px) {
        padding: 0 20px 0 20px;
    }

    @media screen and (max-width : 400px) {
        padding: 0 5px 0 15px;
    }
`

const NewEntryButtonContainer = styled.div`
    width: 50%;  
    margin: auto 0 auto 0;
    padding: 0 150px 0 150px;
    min-width: 100px; 

    @media screen and (max-width : 1280px) {
        padding: 0 100px 0 100px;  
    }

    @media screen and (max-width : 800px) {
        padding: 0 50px 0 50px;
    }

    @media screen and (max-width : 480px) {
        padding: 0 20px 0 20px;
    }

    @media screen and (max-width : 400px) {
        padding: 0 15px 0 5px;
    }
`

const TabsContainer = styled.div`
    margin: 20px;
    
    .nav-tabs .nav-item .nav-link {
      background-color: orange;
      color: #FFF;
    }

    .nav-tabs .nav-item .nav-link.active {
      background-color: #e1e2e3;
      color: black;
    }
`

const CardContainer = styled.div`
    float: left;
    width: 30%;
    padding-top: 15px;

    @media screen and (max-width : 1280px) {
        width : 100%;
        padding-top: 0px;
    }
`

const SleepTracker = () => {
    const [show, setShow] = useState(false);
    const [statistics, setStatistics] = useState({
        date: new Date(),
        selectedTabKey: "dayTab",
        day: null,
        week: null,
        month: null,
        year: null
    });

    useEffect(() => {
        const viewStatistics = async () => {
            await updateViewedStatisticsAsync(statistics.selectedTabKey, statistics.date);
        }

        viewStatistics();
    }, []);

    const handleClose = async () => {
        setShow(false)
        await updateViewedStatisticsAsync(statistics.selectedTabKey, statistics.date);
    };
    const handleShow = () => setShow(true);

    const handleDateChange = async (date) => {
        await updateViewedStatisticsAsync(statistics.selectedTabKey, new Date(date));
    };

    const handleTabSelection = async (tabKey) => {
        setStatistics({ ...statistics, selectedTabKey: tabKey});
    };

    const updateViewedStatisticsAsync = async (tabKey, date) => {
        setStatistics({
            ...initStatistics(tabKey, date),
            ...await getFullStatisticsOrReturnNullAsync(date)
        });
    }

    const initStatistics = (tabKey, date) => {
        return {
            date: date,
            selectedTabKey: tabKey,
            day: null,
            week: null,
            month: null,
            year: null
        };
    }

    return (
        <Container>
            <Block>
                <Header>Sleep Tracker</Header>
                <GridBox>
                    <DateContainer>
                        <Form.Control
                            type="date"
                            defaultValue={statistics.date.toLocaleDateString('en-CA')}
                            onChange={(event) => handleDateChange(event.target.value)} />
                    </DateContainer>

                    <NewEntryButtonContainer>
                        <NewEntryButton onClick={handleShow}>
                            New Entry
                        </NewEntryButton>
                    </NewEntryButtonContainer>
                </GridBox>
                <SleepEntryModal show={show} handleClose={handleClose} />
                <TabsContainer>
                    <Tabs
                        id="justify-tab-example"
                        className="mb-3"
                        transition={true}
                        justify
                        activeKey={statistics.selectedTabKey}
                        onSelect={(key) => handleTabSelection(key)}>
                        <Tab eventKey="dayTab" title="Day">
                            <ChartContainer>
                                <DayStatisticsChart data={statistics.day} />
                            </ChartContainer>
                            <CardContainer>
                                <DayStatisticsCard data={statistics.day} />
                            </CardContainer>
                        </Tab>
                        <Tab eventKey="weekTab" title="Week">
                            <ChartContainer>
                                <WeekStatisticsChart data={statistics.week} />
                            </ChartContainer>
                            <CardContainer>
                                <WeekAndMonthStatisticsCard data={statistics.week} />
                            </CardContainer>
                        </Tab>
                        <Tab eventKey="monthTab" title="Month">
                            <ChartContainer>
                                <MonthStatisticsChart data={statistics.month} />
                            </ChartContainer>
                            <CardContainer>
                                <WeekAndMonthStatisticsCard data={statistics.month} />
                            </CardContainer>
                        </Tab>
                        <Tab eventKey="yearTab" title="Year">
                            <ChartContainer>
                                <YearStatisticsChart data={statistics.year} />
                            </ChartContainer>
                            <CardContainer>
                                <YearStatisticsCard data={statistics.year} />
                            </CardContainer>
                        </Tab>
                    </Tabs>
                </TabsContainer>
            </Block>
        </Container>
    )
}

export default SleepTracker;
