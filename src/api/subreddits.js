const BASE_URL = "https://corsproxy.io/?https://www.reddit.com";

export async function getSubreddits() {
    try {
        const response = await fetch(`${BASE_URL}/subreddits.json`);
        if (!response.ok) {
            console.log(`Fetch successful, but the response is not ok.`);
            return [];
        }
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        
        return jsonResponse.data.children || [];
    } catch (error) {
        console.log("Error while fetching subreddits", error);
        return [];
    }
}