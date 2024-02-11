# async helper
> wrapper for try-catch blocks for async requests with popup notification for errors (GET and POST) and successful responses (POST and PUT)


import { $api, $asyncGET, $asyncPOST} from '@/http/api'

## Interacting with the app server

const get_res = $api.get('/api/users', config = {});
const post_res = $api.post('/api/users', data = {}, config = {}, silent = false);

> use true as last argument for disabling user notification of successful request
const post_res_silent = $api.post('/api/users', data, axiosconfig, **true**) 

const put_res = $api.put('/api/users/update', data = {}, config = {})

## Interacting with external servers

const external_get = $asyncGET('https://jsonplaceholder.typicode.com/', config = {})
const external_post = $asyncPOST(url, data = {}, config = {}, silent = {})
