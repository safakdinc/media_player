import ytdl from 'ytdl-core';
import axios from 'axios';
export default defineEventHandler(async event => {
  const url =
    'https://rr8---sn-8vq54voxu-n5fe.googlevideo.com/videoplayback?expire=1685735565&ei=LfR5ZMjLK8Kh1gLlr5-4Aw&ip=31.145.8.114&id=o-AIfwiWUoBeMEt81hcmP9_quGgBFmsbn0z9A7rdhKpDK_&itag=251&source=youtube&requiressl=yes&mh=wI&mm=31%2C29&mn=sn-8vq54voxu-n5fe%2Csn-nv47lnsk&ms=au%2Crdu&mv=m&mvi=8&pl=22&initcwndbps=2161250&spc=qEK7BxvWXZmRmwpxHxF1JEBMCW8aFSzMrzhk1wInLA&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=VL8J-F-zaGOfPSgqUGvFQ1UN&gir=yes&clen=3711795&dur=248.741&lmt=1587248103285182&mt=1685713520&fvip=1&keepalive=yes&fexp=24007246%2C24362685&c=WEB&txp=7311222&n=DLh5Uh_fm78P4w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAJ6FO1tDQzsrpXI4LK7YFc0HEVBMsf_35K0nQOjrj2MjAiEA-yjZFt5kW4yTlVSwGdQloYL4QqY8ubWtS9fnIlgy9mo%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgQDXpq77A6y2GLO1YrU4UZcjzC0M01hcc76GdNtQCP6ECIAdWybC-f2g59ohqxNUuP_ghQDleWldlQqgEuiuLP68t';

  const headers = {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'tr,en;q=0.9,en-GB;q=0.8,en-US;q=0.7',
    'Cache-Control': 'max-age=0',
    Connection: 'keep-alive',
    Host: 'rr8---sn-8vq54voxu-n5fe.googlevideo.com',
    'sec-ch-ua': '"Microsoft Edge";v="113", "Chromium";v="113", "Not-A.Brand";v="24", "Microsoft Edge WebView2";v="113"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.57'
  };

  axios
    .get(url, { headers })
    .then(response => {
      // Handle response
      console.log(response);
      return response;
    })
    .catch(error => {
      // Handle error
      console.error(error);
      return error;
    });
});
