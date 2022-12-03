# Trakt-Widgets

Trakt Widgets for everyone!  


## Usage

Add _image_ in your HTML with url: [https://trakt-widgets.vercel.app/slug/layout/view?language=en](https://trakt-widgets.vercel.app/slug/layout/view?language=en)  

### Params

| Name | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `slug` | **Yes**  |  | Trakt username (_account must be **not private**_) |
| `layout` | **Yes** |  | See more in [Layouts](#layouts) |
| `view` | No | `poster` | See more in [Views](#views) |

### Query Params

| Name | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `language` | No | _Browser language_ or `en` | See more in [Languages](#languages) |

_Example:_ 
``` html
<img src="https://trakt-widgets.vercel.app/pizidavi/profile/poster?language=en" alt="trakt-widget"/>
```  

### Layouts

Possible values: `profile` - `watched` - `watching`  

### Views

Possible values: `poster` - `card` - `banner` - `fanart` - `text`  

**IMPORTANT NOTE** `profile` layout works **only** with `poster` view  

### Languages

| Code | Language |
| :---: | :--- |
| `en` | English 🇬🇧 |
| `it` | Italian 🇮🇹 |


## Examples

### Poster

| Profile | Watched | Watching |
| :---: | :---: | :---: |
| ![profile](https://trakt-widgets.vercel.app/pizidavi/profile/poster) | ![watched](https://trakt-widgets.vercel.app/pizidavi/watched/poster) | ![watching](https://trakt-widgets.vercel.app/pizidavi/watching/poster) |

### Card

| Watched | Watching |
| :---: | :---: |
| ![watched](https://trakt-widgets.vercel.app/pizidavi/watched/card) | ![watching](https://trakt-widgets.vercel.app/pizidavi/watching/card) |

### Banner

| Watched | Watching |
| :---: | :---: |
| ![watched](https://trakt-widgets.vercel.app/pizidavi/watched/banner) | ![watching](https://trakt-widgets.vercel.app/pizidavi/watching/banner) |

### FanArt

| Watched | Watching |
| :---: | :---: |
| ![watched](https://trakt-widgets.vercel.app/pizidavi/watched/fanart) | ![watching](https://trakt-widgets.vercel.app/pizidavi/watching/fanart) |

### Text

| Watched | Watching |
| :---: | :---: |
| ![watched](https://trakt-widgets.vercel.app/pizidavi/watched/text) | ![watching](https://trakt-widgets.vercel.app/pizidavi/watching/text) |

---

## Credits

- [Trakt](https://trakt.tv)
- [TheMovieDB](https://www.themoviedb.org)
- [FanArt](https://fanart.tv)
