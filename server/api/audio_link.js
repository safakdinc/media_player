import ytdl from 'ytdl-core';
export default defineEventHandler(async event => {
  const query = getQuery(event);
  const videoUrl = query.url;
  const videoId = ytdl.getURLVideoID(videoUrl);
  const audioInfo = await ytdl.getInfo(videoId);
  const audioFormat = ytdl.chooseFormat(audioInfo.formats, { quality: 'highestaudio' });
  return {
    data: audioFormat.url,
    full: audioFormat
  };
});
