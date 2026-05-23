export const google_api_key="AIzaSyDB3kfv98CMLIKOHRTkYc77jU5fmwk7xGc"
export const Youtube_Api_Url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${google_api_key}`

export const Youtube_Search_Url = (q) =>
	`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&q=${encodeURIComponent(
		q
	)}&key=${google_api_key}`
