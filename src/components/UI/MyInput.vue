<template>
    <input class="input" />
</template>

<script>
    export default {
        name: 'my-input',
        props: ['value']
    }
</script>

<style lang="scss" scoped>
.input {
  padding: 10px 20px;
  font-size: 22px;
}
</style>