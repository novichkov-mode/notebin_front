import React, { useEffect, useState } from 'react';
import '../css/App.css';

function SettingsForm({ deleteType: initialDeleteType, time: initialTime, onChange }) {
    const [deleteType, setDeleteType] = useState(initialDeleteType || 'NEVER');
    const [time, setTime] = useState(initialTime || null);

    // Обновляем локальное состояние при изменении пропсов
    useEffect(() => {
        setDeleteType(initialDeleteType || 'NEVER');
        setTime(initialTime || null);
    }, [initialDeleteType, initialTime]);

    const handleOptionChange = (value) => {
        setDeleteType(value); // Обновляем локальное состояние
        const newTime = value !== 'BURN_BY_PERIOD' ? null : time; // Устанавливаем корректное время
        onChange({ value, time: newTime }); // Передаем обновленное состояние
    };

    const handleTimeChange = (event) => {
        const selectedTime = event.target.value;
        setTime(selectedTime);
        onChange({ value: deleteType, time: selectedTime }); // Передаем преобразованное время
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
                    value="NEVER"
                    checked={deleteType === 'NEVER'}
                    onChange={() => handleOptionChange('NEVER')}
                />
                Never
            </label>
            <label>
                <input
                    type="radio"
                    name="option"
                    value="BURN_AFTER_READ"
                    checked={deleteType === 'BURN_AFTER_READ'}
                    onChange={() => handleOptionChange('BURN_AFTER_READ')}
                />
                Burn after read
            </label>
            <label>
                <input
                    type="radio"
                    name="option"
                    value="BURN_BY_PERIOD"
                    checked={deleteType === 'BURN_BY_PERIOD'}
                    onChange={() => handleOptionChange('BURN_BY_PERIOD')}
                />
                Burn by period
            </label>
            {deleteType === 'BURN_BY_PERIOD' && (
                <div id="timeInputContainer" style={{ marginTop: '5px' }}>
                    <label>
                        Enter time:
                        <input
                            type="time"
                            id="timeInput"
                            name="timeInput"
                            value={time || ''}
                            onChange={handleTimeChange}
                        />
                    </label>
                </div>
            )}
        </div>
    );
}

export default SettingsForm;
