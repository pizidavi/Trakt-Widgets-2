const Tmdb = new (require('tmdbapi'))({
  apiv3: process.env.TMDB
});
const Fanart = new(require('fanart.tv'))(process.env.FANART);

const tmdbBaseUrl = 'https://image.tmdb.org/t/p/w500';

const to_base64 = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.arrayBuffer();
    const contentType = response.headers.get('content-type');
    
    return `data:${contentType};base64,${Buffer.from(blob).toString('base64')}`;
  } catch (e) {
    console.log('Error download image');
  }
  return null;
};

const get = async (view, options) => {
  if (view === 'poster' || view === 'card' || view === 'card-overlay') { // tmdb
    const type = options.type == 'show' ? 'tv' : options.type;
    const images = await Tmdb[type].images({
      movie_id: options.tmdb_id,
      tv_id: options.tmdb_id
    });

    const filterImages = images[view === 'poster' ? 'posters' : 'backdrops'];
    if (!filterImages.length)
      return null;

    let imageEng;
    for (const key in filterImages) {
      const element = filterImages[key];
      if (element.iso_639_1 === options.language)
        return await to_base64(tmdbBaseUrl + element.file_path);
      if (element.iso_639_1 === 'en' && !imageEng)
        imageEng = element.file_path;
    }
    return await to_base64(tmdbBaseUrl + (imageEng || filterImages[0].file_path));
  }
  else if (view === 'fanart' || view === 'fanart-overlay' || view === 'banner') { // fanart
    const type = options.type == 'show' ? 'tv' : 'movie';

    try {
      const images = await Fanart[`${options.type}s`].get(options.tvdb_id || options.imdb_id);

      const filterImages = images[
        view === 'fanart' || view === 'fanart-overlay' ? `${options.type}background` : `${type}banner`
      ];
      if (!filterImages.length)
        return null;

      let imageEng;
      for (const key in filterImages) {
        const element = filterImages[key];
        if (element.lang === options.language)
          return await to_base64(element.url);
        if (element.lang === 'en' && !imageEng)
          imageEng = element.url;
      }
      return await to_base64(imageEng || filterImages[0].url);

    } catch (error) { }
    return null;
  }
};

module.exports = {
  get,
  to_base64
};
