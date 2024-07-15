<template>
    <select v-model="selectedID" class="custom-select" @change="emitSelectedID">
        <option value="" disabled selected>Select ID</option>
        <option v-for="id in ids" :key="id" :value="id">{{ id }}</option>
    </select>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

defineProps({
    ids: {
        type: Array,
        required: true,
    },
});

const emits = defineEmits(['idSelected']);

const selectedID = ref(null);

const emitSelectedID = () => {
    emits('idSelected', selectedID.value);
};
</script>

<style scoped>
.custom-select {
    width: 200px;
    margin-bottom: 20px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #333;
    /* Dark background color */
    color: #fff;
    /* Light text color */
    text-align: center;
    /* Center text inside the dropdown */
}

.custom-select option {
    background-color: #333;
    /* Dark background color */
    color: #fff;
    /* Light text color */
}
</style>