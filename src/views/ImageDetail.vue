<template>
    <NavbarNavbar class="fixed-top" style="background-color: rgba(31, 34, 54, 1)"></NavbarNavbar>
    <div class="container ms-auto" style="min-height: 300px; margin-top: 120px; margin-bottom: 120px;">
        <div class="text-center mb-4">
            <img :src="imageUrl" :alt="title" class="img-fluid img-thumbnail img-shadow img-border"/>
        </div>
        <div class="mb-4">
            <h2>{{ title }}</h2>
        </div>
        <div class="list-group">
            <div class="list-group-item">
                <div class="d-flex justify-content-between align-items-center">
                    <span class="m-1">URL</span>
                    <div class="input-group m-1">
                        <input type="text" class="form-control" :value="imageUrl" readonly/>
                        <button class="btn btn-success" @click="copy(imageUrl)">复制
                        </button>
                    </div>
                </div>
            </div>
            <div class="list-group-item">
                <div class="d-flex justify-content-between align-items-center">
                    <span class="m-1">HTML</span>
                    <div class="input-group m-1">
                        <input type="text" class="form-control" :value="htmlReference" readonly/>
                        <button class="btn btn-success" @click="copy(htmlReference)">复制
                        </button>
                    </div>
                </div>
            </div>
            <div class="list-group-item">
                <div class="d-flex justify-content-between align-items-center">
                    <span class="m-1">Markdown</span>
                    <div class="input-group m-1">
                        <input type="text" class="form-control" :value="markdownReference" readonly/>
                        <button class="btn btn-success" @click="copy(markdownReference)">复制
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <FooterFooter style="background-color: rgba(31, 34, 54, 1)"></FooterFooter>
</template>

<script>
import axios from "axios";
import NavbarNavbar from "@/components/NavbarNavbar.vue";
import FooterFooter from "@/components/FooterFooter.vue";

export default {
    components: {FooterFooter, NavbarNavbar},
    props: ['uuid'],
    data() {
        return {
            imageUrl: axios.defaults.baseURL + '/files/image/' + this.uuid,
            title: '',
            htmlReference: '',
            markdownReference: '',
        };
    },
    methods: {
        copy(text) {
            this.$clipboard(text);
            alert(text + '已复制到剪贴板');
        }
    },
    created() {
        axios.post('/files/image/get-picture-title', {
            uuid: this.uuid
        })
            .then((response) => {
                this.title = response.data.title;
                this.htmlReference = `<img src="${this.imageUrl}" alt="${this.title}">`;
                this.markdownReference = `![${this.title}](${this.imageUrl})`;
            })
            .catch((error) => {
                alert('获取图像失败');
                console.log(error);
            });
    },
};
</script>

<style scoped>
.container {
    max-width: 800px;
}

.img-shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.img-border {
    border: 1px solid #ddd;
    border-radius: 4px;
}
</style>