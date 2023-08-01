<template>
    <div class="text-card-content text-2xl font-medium">
        {{ titleWord }}
    </div>
</template>

<script>
export default {
    props: {
        titleWord: {
            type: String,
            default: ''
        }
    }
}
</script>

<style></style>