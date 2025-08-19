const url = 'https://www.reddit.com/.json';

export async function getPosts() {
    try {
        const response = await fetch(url);
        if (response.ok){
            const jsonResponse = await response.json();
            const posts = jsonResponse.data.children.map((post) => ({
                subreddit: post.data.subreddit_name_prefixed,
                postedAt: post.data.created_utc,
                title: post.data.title,
                selftext: post.data.selftext,
                thumbnail: post.data.thumbnail,
                thumbnail_height: post.data.thumbnail_height,
                thumbnail_width: post.data.thumbnail_width,
                score: post.data.score,
                num_comments: post.data.num_comments,
                secure_media: post.data.secure_media?.reddit_video?.hls_url || null
            }));
            console.log(posts);
            return posts;
            
        } else {
            console.log(`Fetch successful, but the response is not ok.`);
        }
    } catch (error) {
        console.log(`There was an error getting posts: ${error}`);
    }
}