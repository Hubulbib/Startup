// const clickOutside = (event, el, callback) => {
//     console.log(el)
//     if (event.target == el.value || event.composedPath().includes(el.value)) {
//         return
//     }

//     if (typeof callback === 'function') {
//         callback()
//     }
// }

// export default {
//     mounted(el) {
//         window.addEventListener('click', event => clickOutside(event, el))
//     },
//     beforeUnmount(el) {
//         window.removeEventListener('click', clickOutside)
//     },
//     name: 'click-outside'
// }