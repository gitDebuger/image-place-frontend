<template>
    <div>
        <NavbarNavbar class="fixed-top" style="background-color: rgba(31, 34, 54, 1)"></NavbarNavbar>
        <div class="container ms-auto" style="min-height: 300px; margin-top: 120px; margin-bottom: 120px;">
            <div class="row">
                <div class="col-md-3">
                    <ul class="nav flex-column nav-pills">
                        <li class="nav-item m-2">
                            <a class="nav-link" :class="{ active: selectedTab === 'allPictures' }"
                               @click="fetchPictures('allPictures')">所有图片</a>
                        </li>
                        <li class="nav-item m-2 align-items-center" v-for="album in albums" :key="album.id">
                            <a class="nav-link" :class="{ active: selectedTab === album.id }"
                               @click="fetchPictures(album.id, album.name)">
                                {{ album.name }}
                                <button class="btn btn-sm btn-success rounded-circle m-1" :disabled="selectedTab !== album.id" @click.stop="showRenameAlbum">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-sm btn-danger rounded-circle m-1" :disabled="selectedTab !== album.id" @click.stop="showDeleteAlbum">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </a>
                        </li>
                        <li class="nav-item m-2 btn btn-outline-warning" @click="addAlbum">添加相册</li>
                    </ul>
                </div>
                <div class="col-md-9">
                    <div v-if="selectedTab === 'allPictures'" class="row">
                        <image-card v-for="image in images" :key="image.uuid" :image="image"></image-card>
                    </div>
                    <div v-if="selectedTab !== 'allPictures'" class="row">
                        <div class="ms-auto" v-if="selectedTab !== 'allPictures'">
                            <button class="btn btn-outline-secondary m-2" @click="showAddPictures">添加图片到相册</button>
                            <button class="btn btn-outline-danger m-2" @click="showRemovePictures">从相册中移除图片</button>
                        </div>
                        <image-card v-for="image in albumImages" :key="image.uuid" :image="image"></image-card>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal d-block" v-if="showCreateAlbumModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">创建相册</h5>
                        <button type="button" class="btn-close" @click="showCreateAlbumModal = false"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group m-2">
                                <label for="albumName">相册名称</label>
                                <input type="text" class="form-control" id="albumName" v-model="albumName"/>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="showCreateAlbumModal = false">取消
                        </button>
                        <button type="button" class="btn btn-success" @click="submitAddAlbum">提交</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal d-block" v-if="showDeleteAlbumModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">删除图片</h5>
                        <button type="button" class="btn-close" @click="showDeleteAlbumModal = false"></button>
                    </div>
                    <div class="modal-body">
                        <h6>名称为 {{ deletedAlbumName }} 的相册</h6>
                        <h6>确定要删除吗？</h6>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="showDeleteAlbumModal = false">取消</button>
                        <button type="button" class="btn btn-danger" @click="deleteAlbum">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal d-block" v-if="showRenameAlbumModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">相册重命名</h5>
                        <button type="button" class="btn-close" @click="cancelRenameAlbum"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group m-2">
                                <label for="oldAlbumName">旧的相册名称</label>
                                <input type="text" class="form-control" id="oldAlbumName" v-model="oldAlbumName" readonly/>
                            </div>
                            <div class="form-group m-2">
                                <label for="newAlbumName">新的相册名称</label>
                                <input type="text" class="form-control" id="newAlbumName" v-model="newAlbumName"/>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cancelRenameAlbum">取消
                        </button>
                        <button type="button" class="btn btn-success" @click="submitRenameAlbum">提交</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal d-block" v-if="showAddPicturesModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">添加图片</h5>
                        <button type="button" class="btn-close" @click="cancelAddPictures"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group m-2">
                                <label for="albumName">相册名称</label>
                                <input type="text" class="form-control" id="albumName" v-model="selectedAlbum" readonly/>
                            </div>
                            <div class="scroll-container form-control">
                                <div v-for="picture in picturesCanBeAdded" :key="picture.uuid">
                                    <div class="custom-checkbox m-2">
                                        <input class="form-check-input" type="checkbox" v-model="checkedPictures"
                                               :value="picture.uuid"/>
                                        <label class="form-check-label form-control">{{ picture.title }}</label>
                                    </div>
                                    <a :href="baseURL + picture.uuid" class="nav-link link-info" target="_blank">查看
                                        {{ picture.title }} 详情</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cancelAddPictures">取消</button>
                        <button type="button" class="btn btn-success" @click="submitAddPictures">提交</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal d-block" v-if="showRemovePicturesModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">移除图片</h5>
                        <button type="button" class="btn-close" @click="cancelRemovePictures"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group m-2">
                                <label for="albumName">相册名称</label>
                                <input type="text" class="form-control" id="albumName" v-model="selectedAlbum" readonly/>
                            </div>
                            <div class="scroll-container form-control">
                                <div v-for="picture in albumImages" :key="picture.uuid">
                                    <div class="custom-checkbox m-2">
                                        <input class="form-check-input" type="checkbox" v-model="checkedRemovePictures"
                                               :value="picture.uuid"/>
                                        <label class="form-check-label form-control">{{ picture.title }}</label>
                                    </div>
                                    <a :href="baseURL + picture.uuid" class="nav-link link-info" target="_blank">查看
                                        {{ picture.title }} 详情</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cancelRemovePictures">取消</button>
                        <button type="button" class="btn btn-success" @click="submitRemovePictures">提交</button>
                    </div>
                </div>
            </div>
        </div>
        <FooterFooter style="background-color: rgba(31, 34, 54, 1)"></FooterFooter>
    </div>
</template>

<script>
import NavbarNavbar from "@/components/NavbarNavbar.vue";
import FooterFooter from "@/components/FooterFooter.vue";
import ImageCard from "@/components/ImageCard.vue";
import axios from "axios";

export default {
    name: "MyPictures",
    components: {
        FooterFooter,
        NavbarNavbar,
        ImageCard,
    },
    data() {
        return {
            selectedTab: 'allPictures',
            images: [],
            albums: [],
            albumImages: [],
            showCreateAlbumModal: false,
            albumName: '',
            showAddPicturesModal: false,
            showRemovePicturesModal: false,
            selectedAlbum: '',
            checkedPictures: [],
            picturesCanBeAdded: [],
            checkedRemovePictures: [],
            baseURL: '/image/',
            deletedAlbumName: '',
            showDeleteAlbumModal: false,
            oldAlbumName: '',
            newAlbumName: '',
            showRenameAlbumModal: false,
        };
    },
    methods: {
        fetchAllPictures() {
            axios.post('/files/image/get-user-all-pictures', {
                token: localStorage.getItem('token'),
            })
                .then(response => {
                    this.images = response.data;
                })
                .catch(error => {
                    alert('获取图像信息失败');
                    console.log(error);
                });
        },
        fetchPictures(album, albumName) {
            if (album === this.selectedTab) {
                return;
            }
            if (album === 'allPictures') {
                this.selectedTab = 'allPictures';
            } else {
                axios.post('/api/get-album-all-pictures', {
                    token: localStorage.getItem('token'),
                    album_id: album,
                })
                    .then((response) => {
                        this.albumImages = response.data;
                    })
                    .catch((error) => {
                        album('获取图像信息失败');
                        console.log(error);
                    })
                this.selectedTab = album;
                this.selectedAlbum = albumName;
            }
        },
        fetchAlbumPictures(album) {
            axios.post('/api/get-album-all-pictures', {
                token: localStorage.getItem('token'),
                album_id: album,
            })
                .then((response) => {
                    this.albumImages = response.data;
                })
                .catch((error) => {
                    album('获取图像信息失败');
                    console.log(error);
                })
        },
        fetchAllAlbums() {
            axios.post('/api/get-user-all-albums', {
                token: localStorage.getItem('token'),
            })
                .then((response) => {
                    this.albums = response.data;
                })
                .catch((error) => {
                    alert('获取相册信息失败');
                    console.log(error);
                })
        },
        addAlbum() {
            this.showCreateAlbumModal = true;
        },
        async deleteAlbum() {
            try {
                await axios.post('/api/delete-album', {
                    token: localStorage.getItem('token'),
                    album: this.selectedTab,
                });
                alert('删除相册成功');
                this.fetchAllAlbums();
                this.selectedTab = 'allPictures';
                this.showDeleteAlbumModal = false;
                this.deletedAlbumName = '';
            } catch (error) {
                alert(error);
            }
        },
        async submitAddAlbum() {
            try {
                await axios.post('/api/add-album', {
                    token: localStorage.getItem('token'),
                    album_name: this.albumName,
                });
                alert('添加相册成功');
                this.fetchAllAlbums();
                this.showCreateAlbumModal = false;
                this.albumName = '';
            } catch (error) {
                alert(error);
            }
        },
        async submitRenameAlbum() {
            try {
                await axios.post('/api/rename-album', {
                    token: localStorage.getItem('token'),
                    album: this.selectedTab,
                    new_album_name: this.newAlbumName,
                });
                alert('相册重命名成功');
                this.fetchAllAlbums();
                this.showRenameAlbumModal = false;
                this.oldAlbumName = this.newAlbumName;
                this.newAlbumName = '';
            } catch (error) {
                alert(error);
            }
        },
        showDeleteAlbum() {
            this.deletedAlbumName = this.selectedAlbum;
            this.showDeleteAlbumModal = true;
        },
        showRenameAlbum() {
            this.oldAlbumName = this.selectedAlbum;
            this.showRenameAlbumModal = true;
        },
        showAddPictures() {
            this.picturesCanBeAdded = this.images.filter(a => !this.albumImages.some(b => a.uuid === b.uuid));
            this.showAddPicturesModal = true;
        },
        showRemovePictures() {
            this.showRemovePicturesModal = true;
        },
        cancelAddPictures() {
            this.checkedPictures = [];
            this.showAddPicturesModal = false;
        },
        cancelRemovePictures() {
            this.showRemovePicturesModal = false;
            this.checkedRemovePictures = [];
        },
        cancelRenameAlbum() {
            this.newAlbumName = '';
            this.showRenameAlbumModal = false;
        },
        async submitAddPictures() {
            try {
                await axios.post('/api/add-pictures-into-album', {
                    token: localStorage.getItem('token'),
                    album: this.selectedTab,
                    pictures: this.checkedPictures,
                });
                alert('添加图片成功');
                this.fetchAlbumPictures(this.selectedTab);
                this.showAddPicturesModal = false;
                this.checkedPictures = [];
            } catch (error) {
                alert(error);
            }
        },
        async submitRemovePictures() {
            try {
                await axios.post('/api/delete-pictures-from-album', {
                    token: localStorage.getItem('token'),
                    album: this.selectedTab,
                    pictures: this.checkedRemovePictures,
                });
                alert('移除图片成功');
                this.fetchAlbumPictures(this.selectedTab);
                this.showRemovePicturesModal = false;
                this.checkedRemovePictures = [];
            } catch (error) {
                alert(error);
            }
        },
    },
    created() {
        this.fetchAllPictures();
        this.fetchAllAlbums();
    },
}
</script>

<style scoped>
.custom-checkbox {
    position: relative;
}

.custom-checkbox input[type="checkbox"] {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    cursor: pointer;
}

.custom-checkbox label {
    display: inline-block;
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    border: 2px solid #ccc;
    text-align: center;
    line-height: 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
}

.custom-checkbox input[type="checkbox"]:checked + label {
    background-color: #4caf50;
    color: #fff;
}

.scroll-container {
    overflow-y: scroll;
    max-height: 200px;
}
</style>