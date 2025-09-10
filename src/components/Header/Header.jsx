import styles from './Header.module.css';
import snooLogo from '../../assets/logo/snoo.svg';
import redditText from '../../assets/logo/Reddit_Logo_Wordmark_OrangeRed.svg';
import { Search } from '../../features/search/Search';

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
                    <Search />
                </div>
            </div>
        </header>
    );
};