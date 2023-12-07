const clickOutside = (event, el, callback, valueToCheck) => {
    if (!valueToCheck) return

    if (event.target == el || event.composedPath().includes(el)) return

    if (typeof callback === 'function') {
        return callback()
    }

    //proxy guard
    if (typeof callback === 'object') {
        if (typeof callback.value === 'function') {
            return callback.value()
        }
    }
}

export default {
    mounted(el, callback, valueToCheck) {
        window.addEventListener('click', event => clickOutside(event, el , callback, valueToCheck))
    },
    beforeUnmount() {
        window.removeEventListener('click', clickOutside)
    },
    name: 'click-outside'
}