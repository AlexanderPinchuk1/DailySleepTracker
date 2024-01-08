import { React, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import OrangeButton from '../../components/button/OrangeButton';
import Errors from '../../components/containers/Errors';
import styled from 'styled-components';
import { getTimeComponentInCorrectFormat } from '../../api/timeAPI'

import {
    getSleepEntryByDateAsync,
    saveSleepEntryAsync,
    updateSleepEntryAsync,
    deleteSleepEntryAsync
} from '../../api/sleepEntryAPI'

const ButtonsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
`

const ButtonContainer = styled.div`
    button{
        min-width: 100px; 
    }
`

const DatePickerContainer = styled.div`
    input .form-control: focus{
        color: red !important;
        background-color: red !important;
    }
`

const SleepEntryModal = ({ show, handleClose }) => {
    const [sleepEntry, setSleepEntry] = useState({
        id: "",
        sleepDate: "",
        startTime: "",
        finishTime: "",
        errors:{
            sleepDate: "",
            startTime: "",
            finishTime: ""
        }
    });

    const setEmptySleepEntry = () => setSleepEntry(initEmptySleepEntry());
    
    const initEmptySleepEntry = () => {
        return {
            id: "",
            sleepDate: "",
            startTime: "",
            finishTime: "",
            errors: {
                id: "",
                sleepDate: "",
                startTime: "",
                finishTime: ""
            }
        };
    }

    const initSleepEntry = (existingEntity) => {
        let data = initEmptySleepEntry();

        if (existingEntity === undefined) {
            return data;
        }

        const startTime = new Date(existingEntity.startTime);
        const finishTime = new Date(existingEntity.finishTime);

        data.id = existingEntity.id;
        data.sleepDate =
            startTime.getFullYear() + '-' +
            getTimeComponentInCorrectFormat(startTime.getMonth() + 1) + '-' +
            getTimeComponentInCorrectFormat(startTime.getDate());
        data.startTime =
            getTimeComponentInCorrectFormat(startTime.getHours()) + ":" +
            getTimeComponentInCorrectFormat(startTime.getMinutes());
        data.finishTime =
            getTimeComponentInCorrectFormat(finishTime.getHours()) + ":" +
            getTimeComponentInCorrectFormat(finishTime.getMinutes());

        return data;
    }

    const handleTimeInput = (event) => {
        const name = event.target.id;
        const value = event.target.value;

        setSleepEntry({
            ...sleepEntry,
            errors: validateField(name, value),
            [name]: value
        });
    }

    const handleSleepDateInputAsync = async (date) => {
        setSleepEntry({
            ...initEmptySleepEntry(),
            errors: validateField('sleepDate', date),
            sleepDate: date
        });

        if (sleepEntry.errors.sleepDate !== "") {
            return;
        }

        const response = await getSleepEntryByDateAsync(date);
        if (response.ok === true) {
            const result = await response.json();
            if (result != null) {
                setSleepEntry(initSleepEntry(result));
            }
        }
    }

    const validateField = (fieldName, value) => {
        let errors = sleepEntry.errors;

        switch (fieldName) {
            case 'sleepDate':
                errors.sleepDate = value !== "" ? '' : 'Sleep date is required';
                break;
            case 'startTime':
                errors.startTime = value !== "" ? '' : 'Start time is required';
                break;
            case 'finishTime':
                errors.finishTime = value !== "" ? '' : 'Finish time is required';
                break;
            default:
                break;
        }

        return errors;
    }

    const updateErrorField = (fieldName, value) => {
        setSleepEntry({
            ...sleepEntry,
            errors: validateField(fieldName, value),
        });
    }

    const isExistInputErrors = () => {
        updateErrorField('sleepDate', sleepEntry.sleepDate);
        updateErrorField('startTime', sleepEntry.startTime);
        updateErrorField('finishTime', sleepEntry.finishTime);

        if (sleepEntry.errors.sleepDate !== "" ||
            sleepEntry.errors.startTime !== "" ||
            sleepEntry.errors.finishTime !== "") {
            return true
        }

        return false;
    }

    const createSleepEntryData = () => {
        let [startTimeHours, startTimeMinutes] = sleepEntry.startTime.split(":");
        let [finishTimeHours, finishTimeMinutes] = sleepEntry.finishTime.split(":");

        let startTime = new Date(sleepEntry.sleepDate);
        let finishTime = new Date(sleepEntry.sleepDate);

        if ((startTimeHours > finishTimeHours) ||
            (startTimeHours === finishTimeHours &&
                startTimeMinutes >= finishTimeMinutes)) {
            finishTime.setDate(finishTime.getDate() + 1);
        }

        startTime.setUTCHours(startTimeHours, startTimeMinutes);
        finishTime.setUTCHours(finishTimeHours, finishTimeMinutes);

        let data = {
            id: sleepEntry.id === "" ? uuidv4() : sleepEntry.id,
            startTime: startTime,
            finishTime: finishTime,
            userId: sleepEntry.userId
        }

        return data;
    }

    const handleSaveAsync = async () => {
        if (isExistInputErrors()) {
            return;
        }

        const response = await saveSleepEntryAsync(createSleepEntryData());

        if (response.ok === true) {
            handleClose();
            setSleepEntry(initEmptySleepEntry());
        } else {
            setSleepEntry({
                ...sleepEntry,
                id: "",
                errors: (await response.json()).errors,
            });
        }
    }

    const handleUpdateAsync = async () => {
        if (isExistInputErrors()) {
            return;
        }

        const response = await updateSleepEntryAsync(createSleepEntryData());

        if (response.ok === true) {
            handleClose();
            setSleepEntry(initEmptySleepEntry());
        } else {
            setSleepEntry({
                ...sleepEntry,
                errors: await response.json(),
            });
        }
    }

    const handleDeleteAsync = async () => {
        const response = await deleteSleepEntryAsync(sleepEntry.id);

        if (response.ok === true) {
            handleClose();
            setSleepEntry(initEmptySleepEntry());
        } else {
            setSleepEntry({
                ...sleepEntry,
                errors: await response.json(),
            });
        }
    }

    const buttons = (sleepEntry.id === ""
        ?
            <ButtonsContainer>
                <ButtonContainer>
                    <OrangeButton onClick={async () => await handleSaveAsync()}>Save</OrangeButton>
                </ButtonContainer>
            </ButtonsContainer>
        :
            <ButtonsContainer>
                <ButtonContainer>
                    <OrangeButton onClick={async () => await handleUpdateAsync()}>Update</OrangeButton>
                </ButtonContainer>
                <ButtonContainer>
                    <OrangeButton onClick={async () => await handleDeleteAsync()}>Delete</OrangeButton>
                </ButtonContainer>
            </ButtonsContainer>
    );  

    return (
        <Modal size="sm" show={show} onHide={() => { handleClose(); setEmptySleepEntry(); }}>
            <Modal.Header closeButton>
                <Modal.Title>Sleep entry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Sleep date</Form.Label>
                        <DatePickerContainer>
                            <Form.Control
                                type="date"
                                value={sleepEntry.sleepDate}
                                id="sleepDate"
                                onChange={async (event) => await handleSleepDateInputAsync(event.target.value)}
                            />
                        </DatePickerContainer>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Start time</Form.Label>
                        <Form.Control
                            type="time"
                            value={sleepEntry.startTime}
                            id="startTime"
                            onChange={(event) => handleTimeInput(event)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Finish time</Form.Label>
                        <Form.Control
                            type="time"
                            value={sleepEntry.finishTime}
                            id="finishTime"
                            onChange={(event) => handleTimeInput(event)}
                        />
                    </Form.Group>

                    <Errors errors={sleepEntry.errors} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {buttons}
            </Modal.Footer>
        </Modal>
    );
}

export default SleepEntryModal;
