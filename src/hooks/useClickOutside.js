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

    onMounted(() => window.addEventListener('click', clickOutside))
    onBeforeMount(() => window.removeEventListener('clcik', clickOutside))

    return {
        clickOutside
    }
}