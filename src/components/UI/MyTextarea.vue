<template>
  <textarea ref="root" cols="30" rows="10" placeholder="Введите текст">
  </textarea>
  <!-- @select="showTippy" -->
</template>

<script>
import { markRaw, computed, ref, h } from "vue";
import { useTippy } from "vue-tippy";
import { useEventListener } from "@vueuse/core";
import MyTippyContextMenu from "@/components/UI/MyTippyContextMenu.vue";

export default markRaw({
  name: "my-textarea",
  setup() {
    const root = ref(null);

    // how to get mouse position

    const tippy = useTippy(root, {
      content: computed(() => h(MyTippyContextMenu)),
      trigger: "manual",
      interactive: true,
      offset: [0, 0],
      arrow: false,
      placement: "right-start"
    });

    const showTippy = (event) => {
      event.preventDefault();
      tippy.show();
    };

    useEventListener("select", (event) => {
      event.preventDefault();

      tippy.setProps({
        getReferenceClientRect: () => ({
          width: 0,
          height: 0,
          top: event.clientY,
          bottom: event.clientY,
          left: event.clientX,
          right: event.clientX,
        }),
      });

      tippy.show();
    });

    return {
      root,
      showTippy,
    };
  },
});
</script>

<style lang="scss" scoped>
textarea {
  resize: none;
}
</style>