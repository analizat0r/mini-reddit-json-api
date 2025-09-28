import styles from './Subreddits.module.css';

export function Subreddits({ display_name_prefixed }) {
    
    return (
        <div className={styles.cardHeaderElements}>
            <div className={styles.cardHeaderElementsAvatar}>
                <span className={styles.cardHeaderElementsAvatarInner}>
                    <img src="#" /> 
                </span>
            </div>
            <span className={styles.subRedditName}>{display_name_prefixed}</span>
        </div>
    );
};