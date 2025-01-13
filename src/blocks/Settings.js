import React, {useState} from 'react';
import '../css/App.css'

function SettingsForm({ onChange }) {
    const [deleteType, setDeleteType] = useState('default');
    const [time, setTime] = useState(null);

    const handleOptionChange = (value) => {
        setDeleteType(value);
        if (value !== 'afterTime') {
            setTime(null);
        }
        onChange({ deleteType: value, time });
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
                    checked={deleteType === 'default'}
                    onChange={() => handleOptionChange('default')}
                />
                Default
            </label>
            <label>
                <input
                    type="radio"
                    name="option"
                    value="afterFirst"
                    checked={deleteType === 'afterFirst'}
                    onChange={() => handleOptionChange('afterFirst')}
                />
                One time look
            </label>
            <label>
                <input
                    type="radio"
                    name="option"
                    value="afterTime"
                    checked={deleteType === 'afterTime'}
                    onChange={() => handleOptionChange('afterTime')}
                />
                After time
            </label>
            {deleteType === 'afterTime' && (
                <div id="timeInputContainer" style={{ marginTop: '5px' }}>
                    <label>
                        Enter time:
                        <input
                            type="datetime-local"
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

