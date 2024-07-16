<template>
    <div class="modal d-block">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">登录</h5>
                    <button type="button" class="btn-close" @click="$emit('close')"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitLogin">
                        <div class="form-group">
                            <label for="username">用户名</label>
                            <input type="text" class="form-control" id="username" placeholder="请输入用户名" v-model="username" required/>
                        </div>
                        <div class="form-group">
                            <label for="password">密码</label>
                            <input type="password" class="form-control" id="password" placeholder="请输入密码" v-model="password" required/>
                        </div>
                        <button type="submit" class="btn btn-primary m-2">登录</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        async submitLogin() {
            try {
                const response = await axios.post('/api/login', {
                    username: this.username,
                    password: this.password,
                });
                const token = response.data.token;
                localStorage.setItem('token', token);
                alert('登录成功');
                this.$emit('close');
                window.location.reload();
            } catch (error) {
                alert(error.response.data.error);
            }
        }
    }
}
</script>

<style scoped>
.modal {
    background: rgba(0, 0, 0, 0.5);
}
</style>