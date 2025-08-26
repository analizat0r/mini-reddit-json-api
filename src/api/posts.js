const url = 'https://www.reddit.com/.json';

// helper function to strip '&amp;' from urls and replace them with '&'
function cleanUrl(url) {
  if (!url) return null;
  return url.replace(/&amp;/g, "&");
}

export async function getPosts() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(`Fetch successful, but the response is not ok.`);
            return [];
        }

        const jsonResponse = await response.json();

        // Step 1. map all posts
        const posts = jsonResponse.data.children.map((post) => ({
            subreddit: post.data.subreddit_name_prefixed,
            postedAt: post.data.created_utc,
            title: post.data.title,
            selftext: post.data.selftext,
            score: post.data.score,
            num_comments: post.data.num_comments,
            secure_media: post.data.secure_media?.reddit_video || null,
            preview: post.data.preview?.images || null
        }));

        // Step 2. fetch subreddit icons in parallel
        const subredditsPromises = posts.map(async (post) => {
            try {
                const subredditUrl = `https://www.reddit.com/${post.subreddit}/about.json`;
                const subResponse = await fetch(subredditUrl);

                if (subResponse.ok) {
                    const subJson = await subResponse.json();
                    const communityIcon =
                        cleanUrl(subJson.data.community_icon) ||
                        cleanUrl(subJson.data.icon_img) ||
                        null;
                    return { ...post, community_icon: communityIcon };
                } else {
                    return { ...post, community_icon: null };
                }
            } catch {
                return { ...post, community_icon: null };
            }
        });

        // Step 3. resolve all promise
        const postsWithIcons = await Promise.all(subredditsPromises);

        console.log(postsWithIcons);
        return postsWithIcons;       
        
    } catch (error) {
        console.log(`There was an error getting posts: ${error}`);
        return [];
    }
}