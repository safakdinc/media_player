import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
export default defineEventHandler(async event => {
  const query = getQuery(event);
  function extractVideoId(url) {
    const match = url.match(
      /youtube\.com.*(\?v=|\/embed\/|\/v\/|youtu\.be\/|\/\d\/|\/embed\?vi?=|\/embed\/vi?=|\/embed\/\d\/|\/v\/|\/v\?=|\/vi\/)([^#\&\?]*).*/i
    );
    if (match && match[2].length === 11) {
      return match[2];
    } else {
      throw new Error('Invalid YouTube URL');
    }
  }
  const videoUrl = query.url;
  const apiKey = process.env.API_KEY;
  const videoId = extractVideoId(videoUrl);
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
  const apiDuration = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${apiKey}`;
  const duration = await axios.get(apiDuration);
  const durationData = duration.data.items[0].contentDetails.duration;
  const response = await axios.get(apiUrl);
  const audioData = response.data;

  return {
    data: audioData,
    duration: durationData
  };
});
