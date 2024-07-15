<template>
    <div class="modal d-block">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">注册</h5>
                    <button type="button" class="btn-close" @click="$emit('close')"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="SubmitRegister">
                        <div class="form-group">
                            <label for="username">用户名</label>
                            <input type="text" class="form-control" id="username" v-model="username" placeholder="请输入用户名" required/>
                        </div>
                        <div class="form-group">
                            <label for="password">密码</label>
                            <input type="password" class="form-control" id="password" v-model="password" placeholder="请输入密码" required/>
                        </div>
                        <div class="form-group">
                            <label for="confirm_password">确认密码</label>
                            <input type="password" class="form-control" id="confirm_password" v-model="confirm_password" placeholder="请确认密码" required/>
                        </div>
                        <div class="form-group">
                            <label for="email">邮箱</label>
                            <input type="email" class="form-control" id="email" v-model="email" placeholder="请输入邮箱" required/>
                        </div>
                        <div class="form-group">
                            <label for="verification_code">验证码</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="email" v-model="verification_code" placeholder="请输入验证码" required/>
                                <button type="button" class="btn btn-secondary" :disabled="isButtonDisabled" @click="sendVerificationCode">
                                    {{ buttonLabel }}
                                </button>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary m-2">注册</button>
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
            password: '',
            confirm_password: '',
            verification_code: '',
            email: '',
            isButtonDisabled: false,
            buttonLabel: '发送验证码',
            countdown: 120,
        }
    },
    methods: {
        async SubmitRegister() {
            if (this.password !== this.confirm_password) {
                alert("两次密码不同！");
                return;
            }
            try {
                const response = await axios.post('/api/register', {
                    username: this.username,
                    password: this.password,
                    email: this.email,
                    verification_code: this.verification_code,
                })
                alert(response.data.message);
                this.$emit('close');
            } catch (error) {
                alert(error);
            }
        },
        async sendVerificationCode() {
            try {
                const response = await axios.post('/api/send-verification-code', {
                    email: this.email,
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