import { Link } from "react-router-dom";
import styles from './Subreddits.module.css';

export function Subreddits({ display_name_prefixed, icon }) {
    const name = display_name_prefixed?.replace(/^r\//, "") || "";

    return (
        <Link to={`/r/${name}`} className={styles.subredditItem} aria-label={display_name_prefixed}>
            <div className={styles.cardHeaderElementsAvatar}>
                <span className={styles.cardHeaderElementsAvatarInner}>
                    <img src={icon || "#"} alt={display_name_prefixed} />
                </span>
            </div>
            <span className={styles.subRedditName}>{display_name_prefixed}</span>
        </Link>
    );
};