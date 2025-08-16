import snooLogo from '../../assets/logo/snoo.svg';
import redditText from '../../assets/logo/Reddit_Logo_Wordmark_Black.svg';
import styles from './Header.module.css';

export function Header() {
    return (
        <header>
            <div className={styles.headerMain}>
                <div className={styles.logoMain}>
                    <a href="#">
                        <div className={styles.logoSvgs}>
                            <img src={snooLogo} alt="Reddit Snoo" className={styles.snoo} />
                            <img src={redditText} alt="Reddit" className={styles.text} /> 
                        </div>
                    </a>
                </div>
                <div className={styles.searchMain}>
                    <div className={styles.searchBar}></div>
                </div>
            </div>
        </header>
    )
}