import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserAuth } from "../../context/AuthContext";
import "./Header.css";
import HamburgerMenu from './HamburgerMenu';

const Header = () => {
    const { user, logout, loading } = UserAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const isLoggedIn = loading
        ? localStorage.getItem('isLoggedIn') === 'true'
        : !!user?.email;

    return (
        <span onClick={() => window.scroll(0, 0)} className='header'>
            <span className="header_title">
                <Link to='/'>
                    FilmStar
                </Link>
            </span>
            <div className="navbar">
                <Link to='/trending'>
                    <button className={`nav_button ${pathname === '/trending' ? 'active' : ''}`}>
                        Trending
                    </button>
                </Link>
                <Link to='/movies'>
                    <button className={`nav_button ${pathname === '/movies' ? 'active' : ''}`}>
                        Movies
                    </button>
                </Link>
                <Link to='/series'>
                    <button className={`nav_button ${pathname === '/series' ? 'active' : ''}`}>
                        Series
                    </button>
                </Link>
            </div>
            {isLoggedIn ? (
                <div className="buttons" key="user-buttons">
                    <button
                        className={`auth_button ${pathname === '/account' ? 'active' : ''}`}
                        onClick={() => navigate('/account')}
                    >
                        Account
                    </button>
                    <button className='auth_button' onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <div className="buttons" key="guest-buttons">
                    <button
                        className={`auth_button ${pathname === '/login' ? 'active' : ''}`}
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                    <button
                        className={`auth_button ${pathname === '/signup' ? 'active' : ''}`}
                        onClick={() => navigate('/signup')}
                    >
                        Signup
                    </button>
                </div>
            )}
            <HamburgerMenu
                pathname={pathname}
                handleLogout={handleLogout}
            >
            </HamburgerMenu>
        </span>
    )
}

export default Header;