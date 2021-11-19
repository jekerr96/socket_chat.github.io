<template>
    <div class="find-container">
        <div class="cssload-container">
            <div class="cssload-arc">
                <div class="cssload-arc-cube"></div>
            </div>
        </div>
        <div class="find-container__find-text">Идет поиск собеседника</div>
        <div class="find-container__cancel" @click="$emit('cancel')">Отмена</div>
    </div>
</template>

<script>
export default {
    name: "loader"
}
</script>