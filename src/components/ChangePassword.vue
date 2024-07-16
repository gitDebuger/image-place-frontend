<template>
    <div>
        <form @submit.prevent="changePassword">
            <div class="form-group">
                <label for="currentPassword">当前密码</label>
                <input type="password" id="currentPassword" v-model="current_password" class="form-control text-center" required/>
            </div>
            <div class="form-group">
                <label for="newPassword">新密码</label>
                <input type="password" id="newPassword" v-model="new_password" class="form-control text-center" required/>
            </div>
            <div class="form-group">
                <label for="confirmPassword">确认新密码</label>
                <input type="password" id="confirmPassword" v-model="confirm_password" class="form-control text-center" required/>
            </div>
            <button type="submit" class="btn btn-success m-4">保存更改</button>
        </form>
    </div>
</template>

<script>
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
        changePassword() {
            /* TODO: check whether the new password is the same as the confirm password
                and send the data to the backend to save it */
        }
    }
}
</script>