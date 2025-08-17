import styles from './Header.module.css';

import snooLogo from '../../assets/logo/snoo.svg';
import redditText from '../../assets/logo/Reddit_Logo_Wordmark_OrangeRed.svg';
import SearchIcon from '../SearchIcon'

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
                    <form>
                        <SearchIcon size={16} />
                        <input placeholder='Search Reddit' className={styles.searchInput}></input>
                        <button></button>
                    </form>
                </div>
            </div>
        </header>
    )
}

// Todo: restyle input to icon be a separate item, input without border. make all inline, centered, etc.