<template>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="navbar">
        <a class="navbar-brand m-2" href="/" style="color: white">
            <img src="@/assets/icon.jpg" width="60" height="60" alt="Logo">PLC图床
        </a>

        <button v-if="!isLoggedIn && !adminLoggedIn" class="navbar-toggler m-3" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div v-if="!isLoggedIn && !adminLoggedIn" class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item m-2">
                    <button class="btn btn-primary" @click="showLoginModal">登录</button>
                </li>
                <li class="nav-item m-2">
                    <button class="btn btn-secondary" @click="showRegisterModal">注册</button>
                </li>
                <li class="nav-item m-2">
                    <button class="btn btn-secondary" @click="showAdminLoginModal">管理员登录</button>
                </li>
            </ul>
        </div>
        <div v-if="isLoggedIn" class="dropdown ms-auto m-2">
            <img :src="image_url" alt="Avatar" class="avatar img-thumbnail rounded-circle dropdown-toggle ms-auto"
                 id="avatarDropdown" data-bs-toggle="dropdown" width="60" height="60" aria-expanded="false"/>
            <ul class="dropdown-menu ms-auto avatar dropdown-menu-end" aria-labelledby="avatarDropdown">
                <li><a class="dropdown-item" @click="logout">退出登录</a></li>
            </ul>
        </div>
        <div v-if="adminLoggedIn" class="dropdown ms-auto m-2">
            <p id="usernameDropdown" class="dropdown-toggle ms-auto" data-bs-toggle="dropdown" aria-expanded="false">管理员<em>{{ adminUsername }}</em>已登录</p>
            <ul class="dropdown-menu ms-auto avatar dropdown-menu-end" aria-labelledby="usernameDropdown">
                <li><a class="dropdown-item" @click="adminLogout">退出登录</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
import axios from "axios";

export default {
    methods: {
        showLoginModal() {
            this.$emit('show-login');
        },
        showRegisterModal() {
            this.$emit('show-register');
        },
        showAdminLoginModal() {
            this.$emit('show-admin-login');
        },
        logout() {
            localStorage.removeItem('token');
            window.location.reload();
        },
        adminLogout() {
            localStorage.removeItem('adminToken');
            window.location.reload();
        },
        async fetchAvatar() {
            if (localStorage.getItem('token')) {
                try {
                    const response = await axios.post('/api/get-avatar', {
                        token: localStorage.getItem('token'),
                    });
                    this.image_url = axios.defaults.baseURL + response.data.url;
                } catch (error) {
                    alert(error);
                }
            }
        },
        async fetchAdminUsername() {
            if (localStorage.getItem('adminToken')) {
                try {
                    const response = await axios.post('/api/get-admin-username-by-token', {
                        token: localStorage.getItem('adminToken'),
                    });
                    this.adminUsername = response.data.username;
                } catch (error) {
                    alert(error);
                }
            }
        },
    },
    computed: {
        isLoggedIn() {
            return !!localStorage.getItem('token');
        },
        adminLoggedIn() {
            return !!localStorage.getItem('adminToken');
        }
    },
    data() {
        return {
            image_url: '',
            adminUsername: '',
        };
    },
    created() {
        this.fetchAvatar();
        this.fetchAdminUsername();
    },
}
</script>

<style scoped>
.navbar-brand img {
    margin-right: 10px;
}

#navbar {
    background: rgba(31, 43, 51, 70%);
}

.avatar {
    cursor: pointer;
}

.dropdown-item {
    text-align: center;
}

#usernameDropdown {
    cursor: pointer;
    color: white;
    font-size: 18px;
}
</style>