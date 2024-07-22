<template>
    <div class="card mb-3 picture-card">
        <div class="d-flex align-items-center card-body">
            <div class="m-2">
                <form class="row">
                    <div class="form-group col-md-3">
                        <label for="uuid">图片编号</label>
                        <input type="text" class="form-control text-center" id="uuid" v-model="uuid" readonly/>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="username">所属用户</label>
                        <input type="text" class="form-control text-center" id="username" v-model="username" readonly/>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="title">图片标题</label>
                        <input type="text" class="form-control text-center" id="title" v-model="title" :disabled="!isEditing"/>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="type">图片格式</label>
                        <input type="text" class="form-control text-center" id="type" v-model="type" readonly/>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="status">图片状态</label>
                        <select class="form-control text-center" id="status" v-model="status" :disabled="!isEditing">
                            <option value="normal">正常</option>
                            <option value="cannot-get">不可获取</option>
                            <option value="deleted">已删除</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="m-2 row">
                <button type="button" class="btn btn-success m-1" v-if="!isEditing" @click="editInfo">编辑信息</button>
                <button type="button" class="btn btn-primary m-1" v-if="isEditing" @click="submitEdit">保存信息</button>
                <button type="button" class="btn btn-warning m-1" @click="viewDetails">查看详情</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

class Picture {
    uuid;
    username;
    title;
    type;
    status;
}

export default {
    name: "PictureCard",
    props: {
        picture: Picture,
    },
    data() {
        return {
            uuid: '',
            username: '',
            title: '',
            type: '',
            status: '',
            isEditing: false,
        };
    },
    created() {
        this.uuid = this.picture.uuid;
        this.username = this.picture.username;
        this.title = this.picture.title;
        this.type = this.picture.type;
        this.status = this.picture.status;
    },
    methods: {
        editInfo() {
            this.isEditing = true;
        },
        submitEdit() {
            axios.post('/api/admin-update-picture-info', {
                token: localStorage.getItem('adminToken'),
                uuid: this.uuid,
                title: this.title,
                status: this.status,
            })
                .catch((error) => {
                    console.log(error);
                    alert('信息更新失败');
                });
            this.isEditing = false;
        },
        viewDetails() {
            window.open(`/image/${this.picture.uuid}`, '_blank');
        },
    }
};
</script>

<style scoped>
.picture-card {
    width: 100%;
}
</style>