import styles from './Header.module.css';

import snooLogo from '../../assets/logo/snoo.svg';
import redditText from '../../assets/logo/Reddit_Logo_Wordmark_OrangeRed.svg';
import SearchIcon from '../Icons/SearchIcon'

export function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerMain}>
                <div className={styles.logoMain}>
                    <a href="#">
                        <div className={styles.logoSvgs}>
                            <img src={snooLogo} alt="Reddit Snoo" className={styles.snoo} />
                            <img src={redditText} alt="Reddit" className={styles.text} /> 
                        </div>
                    </a>
                </div>
                <div className={styles.searchComponent}>
                    <form className={styles.searchComponentChild}>
                        <button>
                            <SearchIcon size={16} className={styles.searchIcon} />
                        </button>
                        <input placeholder='Search Reddit' className={styles.searchInput}></input>
                    </form>
                </div>
            </div>
        </header>
    )
}