import '../css/App.css';
import '../css/dropdown.css';
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { AuthContext } from "../AuthContext";
import SearchBar from "./SearchBar";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false, // Для отображения выпадающего списка
        };
    }

    toggleDropdown = () => {
        this.setState((prevState) => ({
            dropdownOpen: !prevState.dropdownOpen, // Переключение видимости списка
        }));
    };

    translateLink = (url) => {
        const { navigate } = this.props;
        navigate('/note/' + url);
    };

    handleLogout = () => {
        const { logout } = this.props.authContext;
        logout();
        this.props.navigate('/login');
    };

    render() {
        const { isAuthenticated } = this.props.authContext;
        const { dropdownOpen } = this.state;

        return (
            <div className="header-container" style={{ marginBottom: '2%' }}>
                <Link to="/create" className="logo">
                    NoteBin
                </Link>
                <div style={{ width: '50%' }}>
                    <div className="search-bar">
                        <SearchBar onSearch={() => { }} doSearch={this.translateLink} text="Введите ссылку заметки" />
                    </div>
                </div>
                <div className="account-container" style={{ position: 'relative' }}>
                    {isAuthenticated ? (
                        <MdAccountCircle
                            className="account-icon"
                            onClick={this.toggleDropdown}
                        />
                    ) : (
                        <CiLogin
                            className="account-icon"
                            onClick={() => this.props.navigate('/login')}
                        />
                    )}
                    {dropdownOpen && isAuthenticated && (
                        <div className="dropdownStyles">
                            <div
                                className="dropdownItemStyles"
                                onClick={() => this.props.navigate('/account')}
                            >
                                Мои заметки
                            </div>
                            <div className="dropdownItemStyles" onClick={this.handleLogout}>
                                Выйти
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default function HeaderWrapper() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    return <Header navigate={navigate} authContext={authContext} />;
}