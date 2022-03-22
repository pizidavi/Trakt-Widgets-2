# Trakt-Widgets

Trakt Widgets for everyone!  


## Usage

Add _image_ in your HTML with url:  

URL: [https://trakt-widgets.herokuapp.com/slug/layout/view?language=en](https://trakt-widgets.herokuapp.com/slug/layout/view?language=en)  

### Params

| Name | Required | Default |Description |
| :--- | :---: | :---: | :--- |
| `user` | **Yes**  |  | Trakt username (_account must be **not private**_) |
| `view` | **Yes** |  | See more in [Layouts](#layouts) |
| `type` | **Yes** | `poster` | See more in [Views](#views) |

### Query Params

| Name | Required | Default |Description |
| :--- | :---: | :---: | :--- |
| `language` | No | _Browser language_ or `en` | Language code [`en` - `it`] |

_Example:_ 
``` html
<img src="https://trakt-widgets.herokuapp.com/pizidavi/profile/poster?language=en" alt="trakt-widget"/>
```  

### Layouts

Possible values: `profile` - `watched` - `watching`  

### Views

Possible values: `poster` - `card` - `banner` - `fanart` - `text`  

**IMPORTANT NOTE** `profile` layout works only with `poster` view  


## Examples

### Poster

| Profile | Watched | Watching |
| :---: | :---: | :---: |
| ![profile](https://trakt-widgets.herokuapp.com/pizidavi/profile/poster) | ![watched ](https://trakt-widgets.herokuapp.com/pizidavi/watched/poster) | ![watching ](https://trakt-widgets.herokuapp.com/pizidavi/watching/poster) |

### Card

| Watched | Watching |
| :---: | :---: |
| ![watched ](https://trakt-widgets.herokuapp.com/pizidavi/watched/card) | ![watching ](https://trakt-widgets.herokuapp.com/pizidavi/watching/card) |

### Banner

| Watched | Watching |
| :---: | :---: |
| ![watched ](https://trakt-widgets.herokuapp.com/pizidavi/watched/banner) | ![watching ](https://trakt-widgets.herokuapp.com/pizidavi/watching/banner) |

### FanArt

| Watched | Watching |
| :---: | :---: |
| ![watched ](https://trakt-widgets.herokuapp.com/pizidavi/watched/fanart) | ![watching ](https://trakt-widgets.herokuapp.com/pizidavi/watching/fanart) |

### Text

| Watched | Watching |
| :---: | :---: |
| ![watched ](https://trakt-widgets.herokuapp.com/pizidavi/watched/text) | ![watching ](https://trakt-widgets.herokuapp.com/pizidavi/watching/text) |

---

## Credits

- [Trakt](https://trakt.tv)
- [TheMovieDB](https://www.themoviedb.org)
- [FanArt](https://fanart.tv)
