<template>
    <div class="modal d-block">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">管理员登录</h5>
                    <button type="button" class="btn-close" @click="$emit('close')"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="submitAdminLogin">
                        <div class="form-group">
                            <label for="username">用户名</label>
                            <input type="text" class="form-control" id="username" placeholder="请输入用户名"
                                   v-model="username" required/>
                        </div>
                        <div class="form-group">
                            <label for="verification_code">验证码</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="email" v-model="verification_code"
                                       placeholder="请输入验证码" required/>
                                <button type="button" class="btn btn-secondary" :disabled="isButtonDisabled"
                                        @click="sendVerificationCode">
                                    {{ buttonLabel }}
                                </button>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary m-2">管理员登录</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            username: '',
            verification_code: '',
            isButtonDisabled: false,
            buttonLabel: '发送验证码',
            countdown: 120,
        }
    },
    methods: {
        async submitAdminLogin() {
            try {
                const response = await axios.post('/api/admin-login', {
                    username: this.username,
                    verification_code: this.verification_code,
                });
                const adminToken = response.data.token;
                localStorage.setItem('adminToken', adminToken);
                alert('管理员登录成功');
                this.$emit('close');
                window.location.reload();
            } catch (error) {
                alert(error);
            }
        },
        async sendVerificationCode() {
            try {
                const response = await axios.post('/api/send-admin-verification-code', {
                    username: this.username,
                });
                alert(response.data.message);
            } catch (error) {
                alert(error);
            }
            this.startCountdown();
        },
        startCountdown() {
            this.isButtonDisabled = true;
            this.buttonLabel = this.countdown + '秒后重试';
            const interval = setInterval(() => {
                this.countdown--;
                this.buttonLabel = this.countdown + '秒后重试';
                if (this.countdown === 0) {
                    clearInterval(interval);
                    this.isButtonDisabled = false;
                    this.buttonLabel = '发送验证码';
                    this.countdown = 120;
                }
            }, 1000);
        }
    }
}
</script>

<style scoped>
.modal {
    background: rgba(0, 0, 0, 0.5);
}
</style>