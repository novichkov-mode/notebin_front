import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CreateNote from './CreateNote';
import Account from "./Account";
import EditNote from "./EditNote"
import AuthPage from "./AuthPage";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/account" element={<Account />}/>
                    <Route path="/create" element={<CreateNote />}/>
                    <Route path="/note/:noteUrl" element={<EditNote />}/>
                    <Route path="/login" element={<AuthPage />}/>
                </Routes>
            </Router>
        );
    }
}

export default App;