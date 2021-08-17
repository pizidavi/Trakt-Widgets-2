require('dotenv').config();
const Trakt = require('trakt.tv');
const Image = require('../utils/image');
const createError = require('http-errors');

const trakt = new Trakt({
  client_id: process.env.TRAKT_CLIENT_ID,
  plugins: {
    cached: require('trakt.tv-cached')
  },
  options: {
    cached: {
      defaultTTL: 30
    }
  }
});


const profile = async (req, next, view) => {
  const { slug } = req.params;

  return await trakt.cached.users.profile({
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
      trakt.cached.users.stats({
        username: slug
      }),
      trakt.cached.users.history({
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
          const { tmdb, tvdb } = element[type].ids;

          image = await Image.get('card', {
            tmdb_id: tmdb,
            tvdb_id: tvdb,
            type: type
          });
        }

        return {
          'profile': user,
          'stats': stats,
          'image': image
        };
      }
      else if (stats.status !== 'fulfilled')
        return next(stats.reason)
      else if (history.status !== 'fulfilled')
        return next(history.reason)
    });
  }).catch(next);
};

const watched = async (req, next, view) => {
  const { slug } = req.params;

  return await trakt.cached.users.history({
    username: slug
  }).then(async (response) => {
    if (!response.length)
      return {
        'username': slug,
        'element': null,
        'image': null
      };

    const element = response[0];
    const type = (element.type == 'movie' ? 'movie' : 'show');
    const { tmdb, tvdb } = element[type].ids;

    const data = {
      'type': type,
      'title': element[type].title,
      'year': element[type].year
    };
    if (type == 'show') {
      data['season'] = element.episode.season;
      data['episode'] = element.episode.number;
    }

    const image = await Image.get(view, {
      tmdb_id: tmdb,
      tvdb_id: tvdb,
      type: type
    });

    return {
      'username': slug,
      'element': data,
      'image': image
    };
  }).catch((err) => {
    if (err.message.includes('401'))
      return next(createError(401, 'Account private'));
    return next(err);
  });
};

const watching = async (req, next, view) => {
  const { slug } = req.params;

  return await trakt.cached.users.watching({
    username: slug
  }).then(async (response) => {
    if (!response)
      return {
        'username': slug,
        'element': null,
        'image': null
      };

    const element = response;
    const type = (element.type == 'movie' ? 'movie' : 'show');
    const { tmdb, tvdb } = element[type].ids;

    const data = {
      'type': type,
      'title': element[type].title,
      'year': element[type].year
    };
    if (type == 'show') {
      data['season'] = element.episode.season;
      data['episode'] = element.episode.number;
    }

    const image = await Image.get(view, {
      tmdb_id: tmdb,
      tvdb_id: tvdb,
      type: type
    });

    return {
      'username': slug,
      'element': data,
      'image': image
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
