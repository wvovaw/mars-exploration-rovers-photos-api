
# MARS Exploration Rovers Photos API

Simple REST API that gives an access to entire photo base of [NASA MER](https://mars.nasa.gov/mer/) mission rovers Spirit and Opportunity

## API Reference
### Deployed on [deno.com](https://deno.com)

Base URL: https://nasa-mer-photos-api.deno.dev/
#### Get rover metadata 

```http
  GET /metadata
```

| Parameter | Type     | Description                | Default |
| :-------- | :------- | :------------------------- | ------- |
| `rover`   | `string` | **Required**. spirit or opportunity | - |

#### Get all rovers photos

```http
  GET /photos
```

| Parameter | Type     | Description                       | Default |
| :-------- | :------- | :-------------------------------- |---------|
| `rover`   | `string` | **Required**. spirit or opportunity | - |
| `sol`     | `Array<string>` | One sol or more, or range of sols. Examples: [1], [13,23,7,5], [13:22], [:23], [65:] | All sols |
| `cameras` | `Array<string>` | List of needed cameras. Available FHAZ, RHAZ, NAVCAM, PANCAM, MICRO | All cameras | 
| `page_limit` | `number` | Limits how many links will be in one response. Range is unlimited | - | 
| `page` | `number` | Page number of paginated data | - |

#### Look [here](https://github.com/wvovaw/mars-exploration-rovers-photos-api/blob/master/documentation/example_requests.http) for examples
## Related

If You need an API for Perseverance and Curiosity rovers too, have a look at my [postman collection](https://gist.github.com/wvovaw/363b98fdc034bd4a03c09ab102328943) which exposes original NASA API. It has almost the same rich filters but has way more side information.


## Used By

This API is used in the following project:

- [Mars gallery](https://mars-gallery.netlify.app)

