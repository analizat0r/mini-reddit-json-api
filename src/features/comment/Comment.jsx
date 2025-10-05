import styles from './Comment.module.css';
import timeAgoConverter from '../../utils/timeAgo';


export function Comment({ author, body, created_utc, avatar }) {
const avatarSrc = avatar || 'https://www.redditstatic.com/avatars/defaults/v2/avatar_default_5.png';

    return (
        <div className={styles.commentRow}>
            <div className={styles.commentHeader}>
                <div className={styles.cardHeaderElementsAvatar}>
                    <span className={styles.cardHeaderElementsAvatarInner}>
                        <img src={avatarSrc} alt={author} />
                    </span>
                </div>

                <span className={styles.subRedditName}>{author}</span>
                <span className={styles.dividerDot}>•</span>
                <span className={styles.time}>{timeAgoConverter(created_utc)}</span>
            </div>

            <div className={styles.commentBody}>
                {body}
            </div>
        </div>
    );
};