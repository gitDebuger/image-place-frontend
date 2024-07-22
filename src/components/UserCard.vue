<template>
    <div class="mb-3 user-card card">
        <div class="d-flex align-items-center card-body">
            <img :src="avatar" class="user-avatar avatar img-thumbnail rounded-circle m-2" :alt="user.username"/>
            <div class="m-2">
                <form class="row">
                    <div class="form-group col-md-2">
                        <label for="username">用户名</label>
                        <input type="text" class="form-control text-center" id="username" v-model="username" readonly/>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="nickname">昵称</label>
                        <input type="text" class="form-control text-center" id="nickname" v-model="nickname" :disabled="!isEditing"/>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="email">邮箱</label>
                        <input type="email" class="form-control text-center" id="email" v-model="email" :disabled="!isEditing"/>
                    </div>
                    <div class="form-group col-md-5">
                        <label for="resume">简介</label>
                        <input type="text" class="form-control text-center" id="resume" v-model="resume" :disabled="!isEditing"/>
                    </div>
                </form>
            </div>
            <div class="m-2 row">
                <button class="btn btn-success m-1" v-if="!isEditing" @click="editInfo">编辑信息</button>
                <button class="btn btn-primary m-1" v-if="isEditing" @click="saveChanges">保存更改</button>
                <button class="btn btn-warning m-1" :disabled="isEditing" @click="showChangePasswordModal = true">修改密码</button>
                <button class="btn btn-danger m-1" :disabled="isEditing" @click="showDeleteUserModal = true">删除用户</button>
            </div>
        </div>
    </div>
    <div class="modal d-block" v-if="showChangePasswordModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">修改密码</h5>
                    <button type="button" class="btn-close" @click="cancelChangePassword"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <h6 class="text-center" style="color: red">为用户名为 {{ user.username }} 的用户修改密码</h6>
                            <label for="password">新密码</label>
                            <input type="text" class="form-control text-center" id="password" v-model="password"/>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="cancelChangePassword">取消</button>
                    <button type="button" class="btn btn-primary" @click="submitChangePassword">保存并提交</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal d-block" v-if="showDeleteUserModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">删除用户</h5>
                    <button class="btn-close" @click="cancelDeleteUser"></button>
                </div>
                <div class="modal-body">
                    <h6 style="color: red">确定要删除用户名为 {{ user.username }} 的用户吗？</h6>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="cancelDeleteUser">取消</button>
                    <button type="button" class="btn btn-primary" @click="submitDeleteUser">确认删除</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

class User {
    username;
    nickname;
    email;
    resume;
}

export default {
    name: 'UserCard',
    props: {
        user: {
            type: User,
            required: true,
        }
    },
    created() {
        this.username = this.user.username;
        this.nickname = this.user.nickname;
        this.email = this.user.email;
        this.resume = this.user.resume;
        this.avatar = axios.defaults.baseURL + '/files/avatar/' + this.user.username;
    },
    data() {
        return {
            username: '',
            nickname: '',
            email: '',
            resume: '',
            avatar: '',
            isEditing: false,
            showChangePasswordModal: false,
            password: '',
            showDeleteUserModal: false,
        };
    },
    methods: {
        editInfo() {
            this.isEditing = true;
        },
        saveChanges() {
            axios.post('/api/admin-change-user-info', {
                token: localStorage.getItem('adminToken'),
                username: this.username,
                nickname: this.nickname,
                email: this.email,
                resume: this.resume,
            })
                .catch((error) => {
                    alert(error);
                });
            this.isEditing = false;
        },
        cancelChangePassword() {
            this.password = '';
            this.showChangePasswordModal = false;
        },
        async submitChangePassword() {
            await axios.post('/api/admin-change-user-password', {
                token: localStorage.getItem('adminToken'),
                username: this.username,
                password: this.password,
            })
                .then((response) => {
                    console.log(response);
                    alert('密码更新成功');
                    this.showChangePasswordModal = false;
                })
                .catch((error) => {
                    alert(error);
                });
        },
        cancelDeleteUser() {
            this.showDeleteUserModal = false;
        },
        async submitDeleteUser() {
            await axios.post('/api/admin-delete-user', {
                token: localStorage.getItem('adminToken'),
                username: this.username,
            })
                .then((response) => {
                    console.log(response);
                    alert('删除用户成功');
                    this.showDeleteUserModal = false;
                })
                .catch((error) => {
                    alert(error);
                });
        },
    },
};
</script>

<style scoped>
.user-card {
    width: 100%;
}

.user-avatar {
    width: 60px;
    height: 60px;
}
</style>