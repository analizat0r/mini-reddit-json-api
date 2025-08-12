import styles from './Card.module.css';

export function Card() {
    return (
        <div className={styles.card}>

            <div className={styles.cardHeader}>
                <div className={styles.cardHeaderElements}>
                    <div className={styles.cardHeaderElementsAvatar}>
                        <span className={styles.cardHeaderElementsAvatarInner}>
                            <img /> {/* need additional function to get avatar img*/}
                        </span>
                    </div>

                    <span>subreddit</span>
                    <span>•</span>
                    <span>time posted</span>
                </div>
            </div>
            
            <div className={styles.cardBody}>
                <h3>title</h3>
                <div>thumbnail</div>
            </div>

            <div className={styles.cardFooter}>
                <span>upvote </span>
                <span>comments</span>
            </div>

        </div>
    )
}