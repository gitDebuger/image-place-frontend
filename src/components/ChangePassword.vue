<template>
    <div>
        <form @submit.prevent="changePassword">
            <div class="form-group">
                <label for="currentPassword">当前密码</label>
                <input type="password" id="currentPassword" v-model="current_password" class="form-control text-center"
                       required/>
            </div>
            <div class="form-group">
                <label for="newPassword">新密码</label>
                <input type="password" id="newPassword" v-model="new_password" class="form-control text-center"
                       required/>
            </div>
            <div class="form-group">
                <label for="confirmPassword">确认新密码</label>
                <input type="password" id="confirmPassword" v-model="confirm_password" class="form-control text-center"
                       required/>
            </div>
            <button type="submit" class="btn btn-success m-4">保存更改</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'ChangePassword',
    data() {
        return {
            current_password: '',
            new_password: '',
            confirm_password: '',
        };
    },
    methods: {
        async changePassword() {
            if (this.current_password === this.new_password) {
                alert('新密码不能和原密码相同');
            } else if (this.new_password !== this.confirm_password) {
                alert('两次输入的密码不同');
            } else {
                try {
                    const response = await axios.post('/api/update-password', {
                        token: localStorage.getItem('token'),
                        current_password: this.current_password,
                        new_password: this.new_password,
                    });
                    alert(response.data.message);
                    localStorage.removeItem('token');
                    window.location.reload();
                } catch (error) {
                    alert(error);
                }
            }
        }
    }
}
</script>