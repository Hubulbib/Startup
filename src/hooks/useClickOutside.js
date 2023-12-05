import { onBeforeMount, onMounted } from "vue"

export function useClickOutside (el, callback) {
    if (!el) return

    const clickOutside = event => {
        if (event.target == el.value || event.composedPath().includes(el.value)) {
            return
        }

        if (typeof callback === 'function') {
            callback()
        }
    }

    const keyBreake = event => {
        if (typeof callback === 'function' && event.code === 'Escape') {
            callback()
        }
    }

    onMounted(() => {
        window.addEventListener('click', clickOutside)
        window.addEventListener('keydown', keyBreake)
    })
    onBeforeMount(() =>{
        window.removeEventListener('clcik', clickOutside)
        window.removeEventListener('keydown', keyBreake)

    })

    return {
        clickOutside
    }
}