const Tmdb = new (require('tmdbapi'))({
  apiv3: process.env.TMDB
});
const Fanart = new(require('fanart.tv'))(process.env.FANART);
const base64 = require('node-base64-image');

const tmdbBaseUrl = 'https://image.tmdb.org/t/p/w500';

const to_base64 = async (uri) => {
  return 'data:image/;base64,' + await base64.encode(uri, { string: true });
};

const get = async (view, options) => {
  if (view === 'poster' || view === 'card') { // tmdb
    const type = options.type == 'show' ? 'tv' : options.type;
    const images = await Tmdb[type].images({
      movie_id: options.tmdb_id,
      tv_id: options.tmdb_id
    });

    const filterImages = images[view === 'poster' ? 'posters' : 'backdrops'];
    if (!filterImages.length)
      return null;

    for (const key in filterImages) {
      const element = filterImages[key];
      if (element.iso_639_1 === options.language)
        return await to_base64(tmdbBaseUrl + element.file_path);
    }
    return await to_base64(tmdbBaseUrl + filterImages[0].file_path);
  }
  else if (view === 'fanart' || view === 'banner') { // fanart
    const type = options.type == 'show' ? 'tv' : 'movie';

    try {
      const images = await Fanart[`${options.type}s`].get(options.tvdb_id || options.imdb_id);

      const filterImages = images[view === 'fanart' ? `${options.type}background` : `${type}banner`];
      if (!filterImages.length)
        return null;

      for (const key in filterImages) {
        const element = filterImages[key];
        if (element.lang === options.language)
          return await to_base64(element.url);
      }
      return await to_base64(filterImages[0].url);

    } catch (error) { }
    return null;
  }
};

module.exports = {
  get,
  to_base64
};
