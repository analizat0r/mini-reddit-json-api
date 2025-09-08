import { useRef, useEffect } from 'react';
import styles from './Card.module.css';
import ArrowIcon from '../Icons/ArrowIcon';
import CommentIcon from '../Icons/CommentIcon'
import timeAgoConverter from '../../utils/timeAgo';
import numFormater from '../../utils/countFormater';

export function Card( { community_icon, title, selftext, image_url, num_comments, score, subreddit, postedAt, video_url } ) {
    const videoRef = useRef(null);
    
    useEffect(() => {
        if (!videoRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoRef.current.play();
                } else {
                    videoRef.current.pause();
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <article className={styles.card}>

            <div className={styles.cardHeader}>
                <div className={styles.cardHeaderElements}>
                    <div className={styles.cardHeaderElementsAvatar}>
                        <span className={styles.cardHeaderElementsAvatarInner}>
                            <img src={community_icon} /> 
                            {/* fix icon sizing to be 24x24 and circle */}
                        </span>
                    </div>

                    <span className={styles.subRedditName}>{subreddit}</span>
                    <span className={styles.dividerDot}>•</span>
                    <span className={styles.time}>{timeAgoConverter(postedAt)}</span>
                </div>
            </div>
            
            <div className={styles.cardBody}>
                <h3 className={styles.threadTitle}>{title}</h3>
                <div className={styles.threadBody}>
                    {video_url ? (
                        <video
                            ref={videoRef}
                            muted
                            controls
                            preload="metadata"
                            playsInline
                            className={styles.threadImgContainer}
                        >
                            <source src={video_url} type="video/mp4" />
                        </video>
                    ) : image_url ? (
                        <div className={styles.threadImgContainer}>
                            <img src={image_url} alt="Thread image" loading="lazy" />
                        </div>
                    ) : (
                        selftext
                    )}
                </div>
            </div>

            <div className={styles.cardFooter}>
                <span className={styles.threadButtonContainer}>
                    <button>
                        <span className={styles.upVoteArrow}>
                            <ArrowIcon direction={"up"} size={16}/>
                        </span>
                        
                    </button>
                    <span className={styles.upVoteCount}>{numFormater(score)}</span>
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
                        <span>{numFormater(num_comments)}</span>
                    </span>
                </a>
                
            </div>

        </article>
    )
}