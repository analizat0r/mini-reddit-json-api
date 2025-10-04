import { useDispatch, useSelector } from 'react-redux';
import { loadListings } from '../src/features/allListings/allListingsSlice';
import styles from './App.module.css';
import { Card } from './components/Card/Card';
import { Header } from './components/Header/Header';
import { useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Subreddits } from './features/Subreddits/Subreddits';
import { loadSubreddits } from './features/subreddits/subredditsSlice';
import { cleanUrl } from './utils/cleanUrl';
import { useParams } from "react-router-dom";


function App() {
  const dispatch = useDispatch();
  const { subreddit } = useParams();
  const { listings: feedListings, isLoading, hasError } = useSelector((state) => state.allListings);
  const { listings: searchListings, isLoading: searchLoading, hasError: searchError } = useSelector((state) => state.search);
  const { subreddits, isLoading: subredditsLoading, hasError: subredditsError } = useSelector((state) => state.allSubreddits);

  useEffect(() => {
    dispatch(loadListings({ subreddit }));
  }, [dispatch, subreddit]);
  
  useEffect(() => {
    dispatch(loadSubreddits());
  }, [dispatch]);

  // show search results if any, otherwise feed
  const displayedListings = (searchListings && searchListings.length > 0) ? searchListings : feedListings;
  const loading = searchListings && searchListings.length > 0 ? searchLoading : isLoading;
  const error = searchListings && searchListings.length > 0 ? searchError : hasError;

  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          dispatch(loadListings());
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [dispatch, isLoading]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <div>
            {loading && displayedListings.length === 0 ? (
              // show 5 skeleton cards while initial load
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ margin: '16px 0' }}>
                  <Skeleton height={32} width={200} /> {/* header */}
                  <Skeleton height={24} style={{ marginTop: 8 }} /> {/* title */}
                  <Skeleton height={400} /> {/* media placeholder */}
                  <Skeleton height={32} width={250} /> {/* footer */}
                </div>
              ))
            ) : (
              displayedListings.map((post, idx) => (
                <span key={idx}>
                  <Card {...post} />
                  <hr />
                </span>
              ))
            )}
            <div ref={sentinelRef} style={{ height: 1 }} ></div>
          </div>
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h3>Popular communities</h3>
            </div>
            <div className={styles.subredditList}>
            {subredditsLoading && subreddits.length === 0 ? (
               Array.from({ length: 25 }).map((_, i) => (
                 <div key={i} style={{ margin: '16px 0' }}>
                   <Skeleton height={32} /> {/* header */}
                 </div>
               ))
             ) : (
              subreddits
                .filter(subreddit => subreddit && subreddit.data)
                .map((subreddit, idx) => (
                  <div key={subreddit.data.name || idx}>
                    <Subreddits
                      display_name_prefixed={subreddit.data.display_name_prefixed}
                      icon={cleanUrl(subreddit.data.community_icon)}
                    />
                  </div>
              ))
             )}
            </div>
          </aside>
        </div>
      </main>
    </>
  )
}

export default App;