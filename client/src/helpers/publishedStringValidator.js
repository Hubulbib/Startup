const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/ru') 
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.locale('ru')
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

const tz = dayjs.tz.guess()

export function publishedString(date) {
    const serverDate = date 
    const formattedDate = dayjs.utc(date).tz(tz).format();
    console.log('serverDate >', '\n', serverDate)
    console.log('utc +3 >', '\n', formattedDate)
    return dayjs(formattedDate).fromNow()
}

// console.log(Intl.DateTimeFormat().resolvedOptions())