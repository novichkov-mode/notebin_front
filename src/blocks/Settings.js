import React, {useState} from 'react';
import '../css/App.css'

function SettingsForm({ onChange }) {
    const [deleteType, setDeleteType] = useState('NEVER');
    const [time, setTime] = useState(null);

    const handleOptionChange = (value) => {
        setDeleteType(value);
        if (value !== 'BURN_BY_PERIOD') {
            setTime(null);
        }
        onChange({ value: deleteType, time: time});
    };

    const handleTimeChange = (event) => {
        const selectedTime = event.target.value;
        setTime(selectedTime);
        onChange({ deleteType, time: selectedTime });
    };

    return (
        <div className="settings-form" id="settingsForm" style={{ flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h5>Delete type</h5>
            </div>
            <label>
                <input
                    type="radio"
                    name="option"
                    value="default"
                    checked={deleteType === 'NEVER'}
                    onChange={() => handleOptionChange('NEVER')}
                />
                Default
            </label>
            <label>
                <input
                    type="radio"
                    name="option"
                    value="afterFirst"
                    checked={deleteType === 'BURN_AFTER_READ'}
                    onChange={() => handleOptionChange('BURN_AFTER_READ')}
                />
                One time look
            </label>
            <label>
                <input
                    type="radio"
                    name="option"
                    value="afterTime"
                    checked={deleteType === 'BURN_BY_PERIOD'}
                    onChange={() => handleOptionChange('BURN_BY_PERIOD')}
                />
                After time
            </label>
            {deleteType === 'BURN_BY_PERIOD' && (
                <div id="timeInputContainer" style={{ marginTop: '5px' }}>
                    <label>
                        Enter time:
                        <input
                            type="time"
                            id="timeInput"
                            name="timeInput"
                            onChange={handleTimeChange}
                        />
                    </label>
                </div>
            )}
        </div>
    );
}

export default SettingsForm;

