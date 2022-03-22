const Tmdb = new (require('tmdbapi'))({
  apiv3: process.env.TMDB
});
const Fanart = new(require('fanart.tv'))(process.env.FANART);
const base64 = require('node-base64-image');


const to_base64 = async (uri) => {
  return 'data:image/;base64,' + await base64.encode(uri, { string: true });
};

const get = async (view, obj) => {
  let image = null;
  let images, type;

  switch (view) {
    case 'poster':
    case 'card':
      type = obj.type == 'show' ? 'tv' : obj.type;
      images = await Tmdb[type].images({
        movie_id: obj.tmdb_id,
        tv_id: obj.tmdb_id
      });

      const base_url = 'https://image.tmdb.org/t/p/w500';
      if (view == 'poster')
        image = images.posters.length ? base_url + images.posters[0].file_path : null;
      else
        image = images.backdrops.length ? base_url + images.backdrops[0].file_path : null;
      break;

    case 'fanart':
    case 'banner':
      type = obj.type;
      try {
        images = await Fanart[type + 's'].get(obj.tvdb_id);
        const _type = (type == 'show' ? 'tv' : 'movie');
        if (view == 'fanart') {
          if (images[type + 'background'])
            image = images[type + 'background'].length ? images[type + 'background'][0].url : null;
          if (!image && images[_type + 'thumb'])
            image = images[_type + 'thumb'].length ? images[_type + 'thumb'][0].url : null;
        }
        else {
          if (images[_type + 'banner'])
            image = images[_type + 'banner'].length ? images[_type + 'banner'][0].url : null;
        }
      } catch (error) {
        images = '';
      }
      break;
  }

  if (image)
    return await to_base64(image);
  return image;
};


module.exports = {
  get,
  to_base64
};
