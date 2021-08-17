
# Trakt-Widgets

Trakt Widgets for everyone!  


## Usage

Add _image_ in your HTML with _href_:  

URL: [/slug/layout/view?language=en](/slug/layout/view?language=en)  

### Params

| Name | Required | Default |Description |
| :--- | :---: | :---: | :--- |
| `user` | **Yes**  |  | Trakt username (_account must be **not private**_) |
| `view` | **Yes** |  | See more in [Layouts](#layouts) |
| `type` | **Yes** | `poster` | See more in [Views](#views) |

### Query Params

| Name | Required | Default |Description |
| :--- | :---: | :---: | :--- |
| `language` | No | en | Language code [`en` - `it`] |

_Example:_ 
``` html
<img src="/pizidavi/profile/poster?language=en" alt="trakt-widget"/>
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
| ![profile](/pizidavi/profile/poster) | ![watched ](/pizidavi/profile/poster) | ![watching ](/pizidavi/profile/poster) |

### Card

| Watched | Watching |
| :---: | :---: |
| ![watched ](/pizidavi/profile/card) | ![watching ](/pizidavi/profile/card) |

### Banner

| Watched | Watching |
| :---: | :---: |
| ![watched ](/pizidavi/profile/banner) | ![watching ](/pizidavi/profile/banner) |

### FanArt

| Watched | Watching |
| :---: | :---: |
| ![watched ](/pizidavi/profile/fanart) | ![watching ](/pizidavi/profile/fanart) |

### Text

| Watched | Watching |
| :---: | :---: |
| ![watched ](/pizidavi/profile/text) | ![watching ](/pizidavi/profile/text) |

---

## Credits

- [Trakt](https://trakt.tv)
- [TheMovieDB](https://www.themoviedb.org)
- [FanArt](https://fanart.tv)
