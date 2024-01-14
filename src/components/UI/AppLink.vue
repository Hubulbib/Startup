<!-- этот компонент - обёртка для <router-link. Его следует использовать,
когда ссылка приходит из базы данных и мы не знаем заранее, будет ли это
ссылка на внешний сайт, или ссылка на какую-либо внутреннюю страницу.
Пример использования см. в солянке компонентов -->


<template>
  <a class="external"
    v-if="isExternal"
    :href="to"
    target="_blank"
    rel="noopener">
    <Icon icon="lucide:external-link" />
    <slot />
  </a>
  <router-link v-else v-bind="$props">
    <slot />
  </router-link>
</template>

<script>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

export default {
  name: 'app-link',
  props: {
    ...RouterLink.props
  },
  setup(props) {
    const isExternal = computed(() => {
      return ((typeof props.to === 'string') && props.to.startsWith('http'));
    });
    return {
      isExternal
    }
  }
}

</script>

<style scoped lang="scss">
.external {
  display: inline-flex;
  align-items: baseline;
  gap: 2px;

  & svg {
    transform: translateY(2px);
  }
}
</style>
