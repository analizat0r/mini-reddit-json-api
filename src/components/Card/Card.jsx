import styles from './Card.module.css';
import ArrowIcon from '../ArrowIcon';
import CommentIcon from '../CommentIcon'

export function Card( {title} ) {
    return (
        <article className={styles.card}>

            <div className={styles.cardHeader}>
                <div className={styles.cardHeaderElements}>
                    <div className={styles.cardHeaderElementsAvatar}>
                        <span className={styles.cardHeaderElementsAvatarInner}>
                            <img /> {/* need additional function to get avatar img*/}
                        </span>
                    </div>

                    <span className={styles.subRedditName}>r/subreddit</span>
                    <span className={styles.dividerDot}>•</span>
                    <span className={styles.time}>21 hours ago</span>
                </div>
            </div>
            
            <div className={styles.cardBody}>
                <h3 className={styles.threadTitle}>{title}</h3>
                <div className={styles.threadNoImg}>Over the last few days my fyp has started getting weirder, I usually follow cosplay videos, left leaning politics, lgbtiqaq etc. But now occasionally coming up are softcore child exploitation material usually in Russian, while I have said I'm not interested in any of these and have been reporting the posts.
                
                I know I can reset my feed and have done this a few times but I'm still being served these exploitation videos, as a survivor of CSA this is especially triggering.</div>
            </div>

            <div className={styles.cardFooter}>
                <span className={styles.threadButtonContainer}>
                    <button>
                        <span className={styles.upVoteArrow}>
                            <ArrowIcon direction={"up"} size={16}/>
                        </span>
                        
                    </button>
                    <span className={styles.upVoteCount}>407</span>
                    <button>
                        <span className={styles.upVoteArrow}>
                            <ArrowIcon direction={"down"} size={16}/>
                        </span>
                    </button>
                </span>
                <a className={styles.threadButtonContainer}>
                    <span className={styles.commentContainer}>
                        <span className={styles.commentIconContainer}>
                            <CommentIcon size={16}/>
                        </span>
                        <span>103</span>
                    </span>
                </a>
                
            </div>

        </article>
    )
}