import ytdl from 'ytdl-core';
export default defineEventHandler(async event => {
  const query = getQuery(event);
  const url = query.url;
  const videoId = ytdl.getURLVideoID(url);
  const info = await ytdl.getBasicInfo(videoId);

  const title = info.videoDetails.title;
  const duration = info.videoDetails.lengthSeconds;
  const thumbnail = info.player_response.videoDetails.thumbnail.thumbnails.at(-2).url;

  return {
    title: title,
    duration: duration,
    thumbnail: thumbnail
  };
});
