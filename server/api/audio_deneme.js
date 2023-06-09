import ytdl from 'ytdl-core';
export default defineEventHandler(async event => {
  const query = getQuery(event);
  const url = query.url;
  const videoId = ytdl.getURLVideoID(url);
  const audioInfo = await ytdl.getInfo(videoId);
  const title = audioInfo.player_response.videoDetails.title;
  const duration = audioInfo.player_response.videoDetails.lengthSeconds;
  const thumbnail = audioInfo.player_response.videoDetails.thumbnail.thumbnails.at(-1).url;

  return {
    title: title,
    duration: duration,
    thumbnail: thumbnail
  };
});
