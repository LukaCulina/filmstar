import * as React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserAuth } from "../../context/AuthContext";
import MenuIcon from '@mui/icons-material/Menu';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import "./Header.css";
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const HamburgerMenu = ({
    pathname,
    handleLogout
}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { user } = UserAuth();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        bgcolor: '#0c0c0c',
        border: '2px solid #000',
        boxShadow: 24,
        color: 'white',
    };
    return (
        <>
            <span className="hamburger_icon" onClick={handleOpen}>
                <MenuIcon fontSize='large'></MenuIcon>
            </span>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Box sx={style}>
                    <p className='close' onClick={handleClose}>
                        <CloseIcon fontSize='large'></CloseIcon>
                    </p>
                    <div className="hamburger_navbar">
                        <Link to='/trending'>
                            <button className={`nav_button hamburger ${pathname === '/trending' ? 'active' : ''}`}
                                onClick={handleClose}>
                                Trending
                            </button>
                        </Link>
                        <Link to='/movies'>
                            <button className={`nav_button hamburger ${pathname === '/movies' ? 'active' : ''}`}
                                onClick={handleClose}>
                                Movies
                            </button>
                        </Link>
                        <Link to='/series'>
                            <button className={`nav_button hamburger ${pathname === '/series' ? 'active' : ''}`}
                                onClick={handleClose}>
                                Series
                            </button>
                        </Link>
                    </div>
                    {user?.email ? (
                        <div className="hamburger_buttons">
                            <Link to='/account'>
                                <button className={`auth_button hamburger ${pathname === '/account' ? 'active' : ''}`}
                                    onClick={handleClose}>
                                    Account
                                </button>
                            </Link>
                            <button className='auth_button hamburger logout'
                                onClick={() => {
                                    handleLogout();
                                    handleClose();
                                }}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="hamburger_buttons">
                            <Link to='/login'>
                                <button className={`auth_button hamburger ${pathname === '/login' ? 'active' : ''}`}
                                    onClick={handleClose}>
                                    Login
                                </button>
                            </Link>
                            <Link to='/signup'>
                                <button className={`auth_button hamburger ${pathname === '/signup' ? 'active' : ''}`}
                                    onClick={handleClose}>
                                    Signup
                                </button>
                            </Link>
                        </div>
                    )}
                </Box>
            </Modal>
        </>
    )
}

export default HamburgerMenu;