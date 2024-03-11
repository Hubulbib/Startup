<script>
export default {
    name: 'drop-modal',
    props: {
        iconWidth: {
            type: Number,
            default: 64
        },
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<script setup>
import { ref } from 'vue'
import { useDropZone } from '@vueuse/core'

const filesData = ref([])

const onDrop = (files) => {
    filesData.value = []
    if (files) {
        filesData.value = files.map(file => ({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
        }))
    }
}

const dropZoneRef = ref()

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)
</script>

<template>
    <div
        v-show="show"
        ref="dropZoneRef"
        class="modal"
    >
        <div class="modal__inner">
            <Icon
                :icon="isOverDropZone ? 'material-symbols:check' : 'material-symbols:add'"
                :width="iconWidth"
                color="rgba(0, 0, 0, .5)"
            />
            <span>Перетащите файл сюда или кликните для выбора</span>
            <!-- for demo purpose -->
            <div
                v-for="(file, index) in filesData"
                :key="index"
                style="display: flex; flex-direction: column; gap: 20px;"
            >
                <p>Name: {{ file.name }}</p>
                <p>Size: {{ file.size }}</p>
                <p>Type: {{ file.type }}</p>
                <p>Last modified: {{ file.lastModified }}</p>
            </div>
        </div>
    </div>
</template>

<style
    lang="scss"
    scoped
>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    border-radius: 12px;
    width: 50%;
    height: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    box-shadow: 0 0 25px black;
    background-color: rgba(221, 221, 221, 1);
    padding: 10px;

    &__inner {
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        align-items: center;
        user-select: none;
        width: 100%;
        height: 100%;
        border: 2px dashed rgb(129, 129, 255);
        border-radius: 8px;
    }
}
</style>