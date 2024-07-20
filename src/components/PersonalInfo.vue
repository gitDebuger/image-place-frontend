<template>
    <div class="d-flex">
        <div class="m-4">
            <img :src="user.avatar" alt="Avatar" class="img-thumbnail" style="width: 150px; height: 150px"/>
        </div>
        <form @submit.prevent="saveChanges" style="margin-left: 100px">
            <div class="form-group">
                <label for="username">用户名</label>
                <input type="text" id="username" v-model="user.username" :disabled="true"
                       class="form-control text-center"/>
            </div>
            <div class="form-group">
                <label for="nickname">昵称</label>
                <input type="text" id="nickname" v-model="user.nickname" :disabled="!isEditing"
                       class="form-control text-center"/>
            </div>
            <div class="form-group">
                <label for="email">邮箱</label>
                <input type="email" id="email" v-model="user.email" :disabled="!isEditing"
                       class="form-control text-center" required/>
            </div>
            <div class="form-group">
                <label for="resume">个人简介</label>
                <textarea id="resume" v-model="user.resume" :disabled="!isEditing" class="form-control"
                          style="width: 400px; height: 100px"></textarea>
            </div>
            <button v-if="!isEditing" @click="editProfile" class="btn btn-primary mt-2">修改信息</button>
            <button v-if="isEditing" type="submit" class="btn btn-success mt-2">保存更改</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'PersonalInfo',
    data() {
        return {
            user: {
                avatar: '',
                username: '',
                nickname: '',
                email: '',
                resume: '',
            },
            isEditing: false,
        };
    },
    methods: {
        async saveChanges() {
            try {
                const response = await axios.post('/api/update-personal-info', {
                    token: localStorage.getItem('token'),
                    nickname: this.user.nickname,
                    email: this.user.email,
                    resume: this.user.resume,
                });
                alert(response.data.message);
            } catch (error) {
                alert(error);
            }
            await this.fetchPersonalInfo();
            this.isEditing = false;
        },
        editProfile() {
            this.isEditing = true;
        },
        async fetchAvatar() {
            if (localStorage.getItem('token')) {
                try {
                    const response = await axios.post('/api/get-avatar', {
                        token: localStorage.getItem('token'),
                    });
                    this.user.avatar = axios.defaults.baseURL + response.data.url;
                } catch (error) {
                    alert(error);
                }
            }
        },
        async fetchPersonalInfo() {
            try {
                const response = await axios.post('/api/get-personal-info', {
                    token: localStorage.getItem('token'),
                });
                this.user.username = response.data.username;
                this.user.nickname = response.data.nickname;
                this.user.email = response.data.email;
                this.user.resume = response.data.resume;
            } catch (error) {
                alert(error);
            }
        },
    },
    created() {
        this.fetchAvatar();
        this.fetchPersonalInfo();
    }
};
</script>