import { useState } from 'react';
import styles from './Header.module.css';
import snooLogo from '../../assets/logo/snoo.svg';
import redditText from '../../assets/logo/Reddit_Logo_Wordmark_OrangeRed.svg';
import { Search } from '../../features/search/Search';

export function Header({ sidebarOpen, onBurgerClick }) {
    return (
        <header className={styles.header}>
            <div className={styles.headerMain}>
                <div className={styles.logoMain}>
                    <a href="http://localhost:5173/">
                        <div className={styles.logoSvgs}>
                            <img src={snooLogo} alt="Reddit Snoo" className={styles.snoo} />
                            <span className={styles.logoText}>
                                <img src={redditText} alt="Reddit" className={styles.text} />
                            </span>
                        </div>
                    </a>
                </div>
                <div className={styles.searchComponent}>
                    <Search />
                </div>
                <button
                    className={`${styles.burger} ${sidebarOpen ? styles.burgerOpen : ''}`}
                    aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                    onClick={onBurgerClick}
                >
                    {sidebarOpen ? (
                        <span style={{fontSize: 24, fontWeight: 'bold', lineHeight: 1}}>×</span>
                    ) : (
                        <>
                            <span />
                            <span />
                            <span />
                        </>
                    )}
                </button>
            </div>
        </header>
    );
};