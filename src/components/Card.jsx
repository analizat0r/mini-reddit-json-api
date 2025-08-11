import styles from './Card.module.css';

export function Card() {
    return (
        <div className={styles.width}>
            <div className={styles.cardHeader}>
                <div className={styles.subRedditAvatarContainerParent}>
                    <span className={styles.subRedditAvatarContainerChild}>
                        <span className={styles.subRedditAvatarContainerChildChild}>
                            <img /> {/* need additional function to get avatar img*/}
                        </span>
                    </span>
                </div>
                <span>subreddit</span>
                <span>•</span>
                <span>time posted</span>
            </div>
            
            <h3>title</h3>
            <div>thumbnail</div>
            <div>
                <span>upvote </span>
                <span>comments</span>
            </div>

        </div>
    )
}