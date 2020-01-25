<template>
    <div>
        <div>
            <button>Add New Distraction</button>
        </div>

        <div>
            <div v-for="item in range" v-bind:key="item.id">
            </div>

            <div>

                <div>Distraction Name</div>
                <div>Add</div>
                <div>Remove</div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
            distractions: new Map()

        }
    }
}

</script>
<style>

</style>