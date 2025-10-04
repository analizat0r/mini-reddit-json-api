import { cleanUrl } from '../utils/cleanUrl';

let after = null;

export async function getPosts(searchTerm = "", after = null, subreddit = null) {
    let url;

    if (subreddit) {
        url = `https://www.reddit.com/r/${encodeURIComponent(subreddit)}.json${after ? `?after=${after}` : ""}`;
    } else if (searchTerm) {
        url = `https://www.reddit.com/search.json?q=${encodeURIComponent(searchTerm)}${after ? `&after=${after}` : ""}`;
    } else {
        url = `https://www.reddit.com/.json${after ? `?after=${after}` : ""}`;
    }
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(`Fetch successful, but the response is not ok.`);
            return { posts: [], after: null };
        }

        const jsonResponse = await response.json();
        const nextAfter = jsonResponse.data.after;

        // Step 1. map all posts
        const posts = jsonResponse.data.children.map((post) => ({
            subreddit: post.data.subreddit_name_prefixed,
            postedAt: post.data.created_utc,
            title: post.data.title,
            selftext: post.data.selftext,
            score: post.data.score,
            num_comments: post.data.num_comments,
            video_url: post.data.secure_media?.reddit_video?.fallback_url || null,
            image_url: post.data.preview?.images?.[0]?.source?.url
                ? cleanUrl(post.data.preview.images[0].source.url)
                : null
        }));

        // Step 2. fetch subreddit icons in parallel
        // const subredditsPromises = posts.map(async (post) => {
        //     try {
        //         const subredditUrl = `https://corsproxy.io/?https://www.reddit.com/${post.subreddit}/about.json`;
        //         const subResponse = await fetch(subredditUrl);

        //         if (subResponse.ok) {
        //             const subJson = await subResponse.json();
        //             const communityIcon =
        //                 cleanUrl(subJson.data.community_icon) ||
        //                 cleanUrl(subJson.data.icon_img) ||
        //                 null;
        //             return { ...post, community_icon: communityIcon };
        //         } else {
        //             return { ...post, community_icon: null };
        //         }
        //     } catch {
        //         return { ...post, community_icon: null };
        //     }
        // });

        // // Step 3. resolve all promise
        // const postsWithIcons = await Promise.all(subredditsPromises);

        return { posts, after: nextAfter };       
    } catch (error) {
        console.log(`There was an error getting posts: ${error}`);
        return { posts: [], after: null };
    }
}