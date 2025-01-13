import React from "react";

function NotFound() {
    return (
        <div>
            <div style={{ height: 'calc(80vh - 64px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1>Заметка не найдена</h1>
                    <p>Извините, заметка, которую вы ищете, не существует или была удалена.</p>
                </div>
            </div>
        </div>
    );
}

export default NotFound;