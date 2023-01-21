const express = require('express');
const createError = require('http-errors');
const controller = require('../controllers/controller');

const router = express.Router();


router.get('/', (req, res) => {
  res.render('home');
});

router.get('/:slug/:layout/:view?', async (req, res, next) => {
  const layouts = [ 'profile', 'watched', 'watching' ];
  const views = [ 'poster', 'card', 'banner', 'fanart', 'text' ];

  const slug = req.params.slug;
  const layout = req.params.layout;
  const view = req.params.view || 'poster';
  const language = req.locale;

  if (layouts.indexOf(layout) < 0)
    return next(createError(400, res.__('error.LAYOUT_NOT_FOUND')));
  if (views.indexOf(view) < 0)
    return next(createError(400, res.__('error.VIEW_NOT_FOUND')));

  if (layout == 'profile' && view != 'poster')
    return next(createError(400, res.__('error.VIEW_NOT_COMPATIBLE', 'profile', 'poster')));

  res.format({
    html: () => {
      res.render('viewer', { title: layout, slug: slug });
    },
    'image/*': async () => {
      const data = await controller[layout](req, next, view, language);
      if (data) {
        res.set('Cache-Control', 'no-cache');
        res.set('Content-Type', 'image/svg+xml');
        res.render(`${view}` + (layout == 'profile' ? `-${layout}` : ''), {
          'layout': layout,
          'data': data
        });
      }
    }
  });
});


module.exports = router;
