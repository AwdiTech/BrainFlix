import logo from './../../assets/Logo/BrainFlix-logo.svg';
import searchIcon from './../../assets/Icons/search.svg';
import userIcon from './../../assets/images/Mohan-muruge.jpg';
import uploadIcon from './../../assets/Icons/upload.svg';
import './Header.scss';

/**
 * Header Component
 * 
 * Represents the main navigation header of BrainFlix. It includes the site logo,
 * a search bar, a user icon, and an upload button.
 */


function Header() {

    return (
        <header className="main-nav">

            <div className='main-nav__logo-container'>
                <img className="main-nav__logo bf-logo" src={logo} alt="" /> {/*BrainFlix Logo*/}
            </div>

            <div className="main-nav__search-bar">
                <img src={searchIcon} className="main-nav__search-icon" alt="" />
                <input type="text" placeholder="Search" className="main-nav__search-input" />
            </div>

            <div className='main-nav__user-icon-container'>
                <img className="main-nav__user-icon user-icon" src={userIcon} alt="" /> {/*Icon*/}
            </div>

            <button className="main-nav__upload-button cta-button">
                <img src={uploadIcon} className="main-nav__upload-icon style-icon" alt="" />
                UPLOAD
            </button>

        </header>
    );
}

export default Header;