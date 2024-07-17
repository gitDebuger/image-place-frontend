<template>
    <div style="position: relative; width: 800px;">
        <div id="block" style="position: relative; left: 50%; transform: translateX(-50%);" class="m-2">
            <vue-cropper
                ref="cropper"
                :img="imageUrl"
                output-type="jpeg"
                auto-crop
                fixed
                :fixed-number="[1, 1]"
                center-box
            />
        </div>
        <div id="buttons" style="position: relative; left: 50%; transform: translateX(-50%);" class="m-2">
            <input type="file" @change="onFileChange" accept="image/*" ref="fileInput" class="d-none"/>
            <button class="btn btn-success m-2" @click="this.$refs.fileInput.click()">选择图片</button>
            <button class="btn btn-dark m-2" @click="this.$refs.cropper.rotateLeft()" :disabled="imageUrl === ''">左转图片
            </button>
            <button class="btn btn-dark m-2" @click="this.$refs.cropper.rotateRight()" :disabled="imageUrl === ''">右转图片
            </button>
            <button class="btn btn-primary m-2" @click="preview" :disabled="imageUrl === ''">头像预览</button>
            <button class="btn btn-danger m-2" @click="this.imageUrl = ''" :disabled="imageUrl === ''">清除图片</button>
            <button class="btn btn-outline-success m-2" @click="uploadImage" :disabled="imageUrl === ''">上传头像</button>
        </div>
    </div>
    <div class="modal d-block" v-if="showPreview">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">截图预览</h5>
                    <button type="button" class="btn-close" @click="showPreview = false"></button>
                </div>
                <div class="modal-body">
                    <img :src="preViewUrl" alt="Preview"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'ImageUpload',
    data() {
        return {
            imageUrl: '',
            showPreview: false,
            preViewUrl: '',
        }
    },
    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            if (file) {
                this.imageUrl = URL.createObjectURL(file);
            }
        },
        preview() {
            this.$refs.cropper.getCropBlob((data) => {
                this.preViewUrl = window.URL.createObjectURL(data);
                this.showPreview = true;
            })
        },
        uploadImage() {
            this.$refs.cropper.getCropBlob((data) => {
                const formData = new FormData();
                formData.append('file', data);
                formData.append('token', localStorage.getItem('token'));
                try {
                    axios.post('/files/avatar/update-avatar', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    alert('头像修改成功');
                    window.location.reload();
                } catch (error) {
                    alert(error);
                }
            })
        }
    }
}
</script>

<style>
#block {
    width: 300px;
    height: 300px;
}
</style>