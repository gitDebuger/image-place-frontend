<template>
    <div class="card image-card m-2" @click="goToDetail">
        <img :src="baseURL + image.uuid" class="card-img-top" :alt="image.name"/>
        <div class="card-body overlay">
            <h5 class="card-title">{{ image.title }}</h5>
            <button class="btn btn-success m-2" @click.stop="showSetting">设置</button>
            <button class="btn btn-danger m-2" @click.stop="showDelete">删除</button>
        </div>
    </div>
    <div class="modal d-block" v-if="showDeleteModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">删除图片</h5>
                    <button type="button" class="btn-close" @click="showDeleteModal = false"></button>
                </div>
                <div class="modal-body">
                    <h6>编号为 {{ image.uuid }} 的图片</h6>
                    <h6>确定要删除吗？</h6>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="showDeleteModal = false">取消</button>
                    <button type="button" class="btn btn-danger" @click="deleteImage">确定</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal d-block" v-if="showSettingModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">图片设置</h5>
                    <button type="button" class="btn-close" @click="cancelSetting"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group m-2">
                            <label for="uuid">图片编号</label>
                            <input type="text" class="form-control" id="uuid" v-model="imageUUID" readonly/>
                        </div>
                        <div class="form-group m-2">
                            <label for="title">标题</label>
                            <input type="text" class="form-control" id="title" v-model="imageTitle" required/>
                        </div>
                        <div class="form-group m-2">
                            <span class="tooltip-container m-1">
                                <span class="tooltip-icon" @mouseover="showTooltip = true"
                                      @mouseleave="showTooltip = false">?</span>
                                <span class="tooltip-content" v-if="showTooltip">
                                    当图片状态设置为“不可访问”时，您将不能通过URL访问图片或查看图片详情。
                                </span>
                            </span>
                            <label for="status">图片状态</label>
                            <input type="radio" name="status" value="normal" v-model="imageStatus"/>正常
                            <input type="radio" name="status" value="cannot-get" v-model="imageStatus"/>不可访问
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="cancelSetting">取消</button>
                    <button type="button" class="btn btn-success" @click="submitImageSetting">提交</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

class Image {
    uuid;
    title;
    status;
}

export default {
    name: 'ImageCard',
    props: {
        image: {
            type: Image,
            required: true,
        },
    },
    methods: {
        axios,
        goToDetail() {
            window.open(`/image/${this.image.uuid}`, '_blank');
        },
        showDelete() {
            this.showDeleteModal = true;
        },
        showSetting() {
            this.showSettingModal = true;
        },
        async deleteImage() {
            try {
                const response = await axios.request({
                    url: `/files/image/revert/${this.imageUUID}`,
                    method: 'DELETE',
                    data: {
                        token: localStorage.getItem('token'),
                    },
                });
                alert(response.data.message);
            } catch (error) {
                alert(error);
            }
            this.showDeleteModal = false;
            window.location.reload();
        },
        async submitImageSetting() {
            if (this.imageTitle !== this.image.title || this.imageStatus !== this.image.status) {
                try {
                    const response = await axios.post('/files/image/update-image-info', {
                        token: localStorage.getItem('token'),
                        uuid: this.imageUUID,
                        title: this.imageTitle,
                        status: this.imageStatus,
                    });
                    alert(response.data.message);
                } catch (error) {
                    alert(error);
                }
                this.showDeleteModal = false;
                window.location.reload();
            }
        },
        cancelSetting() {
            this.showSettingModal = false;
            this.imageStatus = this.image.status;
            this.imageTitle = this.image.title;
        }
    },
    data() {
        return {
            baseURL: axios.defaults.baseURL + '/files/image/',
            showDeleteModal: false,
            showSettingModal: false,
            imageTitle: this.image.title,
            imageUUID: this.image.uuid,
            imageStatus: this.image.status,
            showTooltip: false,
        };
    },
}
</script>

<style scoped>
.image-card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    width: 230px;
    height: 150px;
}

.image-card:hover {
    transform: scale(1.05);
}

.card-img-top {
    display: block;
    object-fit: contain;
}

.overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.image-card:hover .overlay {
    opacity: 1;
}

.tooltip-container {
    position: relative;
    display: inline-block;
}

.tooltip-icon {
    background-color: #e2e2e2;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    cursor: pointer;
    margin-left: 10px;
}

.tooltip-content {
    visibility: visible;
    width: 300px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%; /* Position the tooltip above the icon */
    left: 50%;
    margin-left: -100px;
    opacity: 0.9;
    font-size: 14px;
}
</style>