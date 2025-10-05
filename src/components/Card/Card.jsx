import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Card.module.css';
import ArrowIcon from '../Icons/ArrowIcon';
import CommentIcon from '../Icons/CommentIcon'
import timeAgoConverter from '../../utils/timeAgo';
import numFormater from '../../utils/countFormater';
import { Comment } from '../../features/comment/Comment';
import { fetchComments } from '../../features/comment/commentSlice';


export function Card( { community_icon, title, selftext, image_url, num_comments, score, subreddit, postedAt, video_url, permalink } ) {
    const dispatch = useDispatch();
    const [openComments, setOpenComments] = useState(false);
    const comments = useSelector((state) => state.comments.byPermalink[permalink] || []);
    const commentsLoading = useSelector((state) => state.comments.loading[permalink]);
    const commentsError = useSelector((state) => state.comments.error[permalink]);

    const handleCommentsClick = (e) => {
        e.preventDefault();
        const next = !openComments;
        setOpenComments(next);
        if (next && comments.length === 0 && !commentsLoading) {
            dispatch(fetchComments(permalink));
        }
    };
    
    // function which plays/pauses videos when in/out of viewport
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
                <a href="#" className={styles.threadButtonContainer} onClick={handleCommentsClick}>
                    <span className={styles.commentContainer}>
                        <span className={styles.commentIconContainer}>
                            <CommentIcon size={16}/>
                        </span>
                        <span>{numFormater(num_comments)}</span>
                    </span>
                </a>
            </div>

            {openComments && (
                <div className={styles.commentsWrapper}>
                    {commentsLoading ? (
                    <div>Loading comments...</div>
                    ) : commentsError ? (
                    <div>Error loading comments</div>
                    ) : comments.length === 0 ? (
                    <div>No comments</div>
                    ) : (
                    comments.map((c) => (
                        // use your Comment component and pass the expected fields
                        <Comment
                        key={c.data?.id}
                        author={c.data?.author}
                        body={c.data?.body}
                        created_utc={c.data?.created_utc}
                        avatar={c.data?.author_icon_img || c.data?.avatar || ''}
                        />
                    ))
                    )}
                </div>
            )}

        </article>
    )
}