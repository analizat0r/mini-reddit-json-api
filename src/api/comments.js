const BASE_URL = "https://corsproxy.io/?https://www.reddit.com";

export async function getComments(permalink) {
    try {
        const response = await fetch(`${BASE_URL}${permalink}.json`);
        if (!response.ok) {
            console.log(`Fetch successful, but the response is not ok.`);
            return [];
        }
        const jsonResponse = await response.json();        
        return jsonResponse[1]?.data.children || [];
    } catch (error) {
        console.log("Error while fetching comments", error);
        return [];
    }
}