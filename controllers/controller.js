require('dotenv').config();
const Trakt = require('trakt.tv');
const createError = require('http-errors');

const Image = require('../utils/image');

const trakt = new Trakt({
  client_id: process.env.TRAKT_CLIENT_ID,
});


const profile = async (req, next, view, language) => {
  const { slug } = req.params;

  return await trakt.users.profile({
    username: slug,
    extended: 'full'
  }).then(async (response) => {
    const user = {
      'username': response.username,
      'avatar': null,
      'private': response.private,
      'vip': response.vip,
      'vip_ep': response.vip_ep
    };

    if (response.private)
      return {
        'profile': user,
        'stats': null,
        'image': null
      };

    if (response.images && response.images.avatar && response.images.avatar.full)
      user.avatar = await Image.to_base64(response.images.avatar.full);

    return await Promise.allSettled([
      trakt.users.stats({
        username: slug
      }),
      trakt.users.history({
        username: slug
      })
    ]).then(async (values) => {
      let stats = values[0];
      let history = values[1];

      if (stats.status === 'fulfilled' && history.status === 'fulfilled') {
        stats = stats.value;
        history = history.value;

        let image = null;
        if (history.length) {
          const element = history[0];
          const type = (element.type == 'movie' ? 'movie' : 'show');
          const { tmdb, imdb, tvdb } = element[type].ids;

          image = await Image.get('card', {
            tmdb_id: tmdb,
            imdb_id: imdb,
            tvdb_id: tvdb,
            type: type,
            language
          });
        }

        return {
          'profile': user,
          'stats': stats,
          'image': image
        };
      }
      else if (stats.status !== 'fulfilled')
        return next(createError(400, stats.reason))
      else if (history.status !== 'fulfilled')
        return next(createError(400, history.reason))
    });
  }).catch(next);
};

const watched = async (req, next, view, language) => {
  const { slug } = req.params;

  let profile_image = null;
  if (view === 'fanart-overlay') {
    profile_image = await trakt.users.profile({
      username: slug,
      extended: 'full'
    }).then((response) => {
      return Image.to_base64(response.images.avatar.full);
    });
  }

  return await trakt.users.history({
    username: slug
  }).then(async (response) => {
    if (!response.length)
      return {
        'username': slug,
        'element': null,
        'image': null,
        'profile_image': profile_image
      };

    const element = response[0];
    const type = (element.type == 'movie' ? 'movie' : 'show');
    const { tmdb, imdb, tvdb } = element[type].ids;

    const data = {
      'type': type,
      'title': element[type].title.substring(0, view === 'poster' ? 23 : 45),
      'year': element[type].year
    };
    if (type == 'show') {
      data['season'] = element.episode.season;
      data['episode'] = element.episode.number;
      data['episode_title'] = element.episode.title || "Unknown Episode";
    }

    let image = null;
    if (view !== 'text')
      image = await Image.get(view, {
        tmdb_id: tmdb,
        imdb_id: imdb,
        tvdb_id: tvdb,
        type: type,
        language
      });

    return {
      'username': slug,
      'element': data,
      'image': image,
      'profile_image': profile_image
    };
  }).catch((err) => {
    if (err.message.includes('401'))
      return next(createError(401, 'Account private'));
    return next(err);
  });
};

const watching = async (req, next, view, language) => {
  const { slug } = req.params;

  let profile_image = null;
  if (view === 'fanart-overlay') {
    profile_image = await trakt.users.profile({
      username: slug,
      extended: 'full'
    }).then((response) => {
      return Image.to_base64(response.images.avatar.full);
    });
  }

  return await trakt.users.watching({
    username: slug
  }).then(async (response) => {
    if (!response)
      return {
        'username': slug,
        'element': null,
        'image': null,
        'profile_image': profile_image
      };

    const element = response;
    const type = (element.type == 'movie' ? 'movie' : 'show');
    const { tmdb, imdb, tvdb } = element[type].ids;

    const data = {
      'type': type,
      'title': element[type].title.substring(0, view === 'poster' ? 23 : 45),
      'year': element[type].year
    };
    if (type == 'show') {
      data['season'] = element.episode.season;
      data['episode'] = element.episode.number;
      data['episode_title'] = element.episode.title || "Unknown Episode";
    }

    let image = null;
    if (view != 'text')
      image = await Image.get(view, {
        tmdb_id: tmdb,
        imdb_id: imdb,
        tvdb_id: tvdb,
        type: type,
        language
      });

    return {
      'username': slug,
      'element': data,
      'image': image,
      'profile_image': profile_image
    };
  }).catch((err) => {
    if (err.message.includes('401'))
      return next(createError(401, 'Account private'));
    return next(err);
  });
};


module.exports = {
  profile,
  watched,
  watching
};
