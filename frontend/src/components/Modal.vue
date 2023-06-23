<template>
    <div class="modal-bg" v-show="show">
        <div class="modal-container">
            <div class="modal-header">
                {{ title }}
            </div>
            <div class="modal-main">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <button round @click="hideModal">Cancel</button>
                <button round type="primary" @click="submit">Confirm</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'modal',
    props: {
        show: {
            type: Boolean,
            default: false,
            required: true,
        },
        title: {
            type: String,
            default: ''
        },
    },
    methods: {
        hideModal() {
            this.$emit('hideModal')
        },
        submit() {
            this.$emit('submit')
        },
    }
}
</script>

<style lang="scss" scoped>
.modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 10;
}
.modal-container {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.modal-header {
    height: 56px;
    background: #98badb;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    cursor: move;
}
.modal-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    border: 1px solid rgb(218, 212, 212);
    button {
        width: 100px;
        font-weight: bold;
    }   
}
.modal-main {
    padding: 15px 40px;
}
</style>
