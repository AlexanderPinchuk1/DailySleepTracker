import { React } from 'react';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';

const CardContainer = styled.div`
    .customCard {
        background-color: orange;
        color: white;
        margin: 40px auto;
        width: 70%;
        height: 300px;
        text-align: center;
    }

    .cardBody{
        background-color: white;
        color: black;
        border-radius: 0 0 5px 5px;
        text-align: center;
    }

    .cardSubtitle{
        color: white !important;
        margin: 10px;
        font-size: 16px;
    }

    .cardHeader{
        font-size: 26px;
    }
`

const StatisticsCard = ({ data }) => {
    const getCardContent = () => {

        return data.points.map((point) => {
            return <div key={point.id}>
                <Card.Title>{point.title}</Card.Title>
                <Card.Text>
                    {point.text}
                </Card.Text>
            </div>
        });

        return  
    }

    return (
        <CardContainer>
            <Card className="customCard">
                <Card.Header className="cardHeader">{data.title}</Card.Header>
                <Card.Subtitle className="mb-2 cardSubtitle">
                    {data.period}
                </Card.Subtitle>
                <Card.Body className="cardBody">
                    {getCardContent()}
                </Card.Body>
            </Card>
        </CardContainer>
    );
};

export default StatisticsCard