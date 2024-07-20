<template>
    <div>
        <NavbarNavbar class="fixed-top" style="background-color: rgba(31, 34, 54, 1)"></NavbarNavbar>
        <div class="container ms-auto" style="min-height: 300px; margin-top: 120px; margin-bottom: 120px;">
            <div class="mb-4">
                <file-pond
                    ref="pond"
                    name="file"
                    label-idle="拖拽文件到这里，或点击<span class='filepond--label-action'>选择文件</span>，或使用Ctrl+V粘贴图片"
                    allow-multiple="true"
                    accepted-file-types="image/*"
                    :server="server"
                />
            </div>
        </div>
        <FooterFooter style="background-color: rgba(31, 34, 54, 1)"></FooterFooter>
    </div>
</template>

<script>
import NavbarNavbar from "@/components/NavbarNavbar.vue";
import FooterFooter from "@/components/FooterFooter.vue";
import vueFilePond from "vue-filepond"
import "filepond/dist/filepond.min.css"
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import axios from "axios";

const FilePond = vueFilePond(
    FilePondPluginImagePreview,
    FilePondPluginFileValidateType,
    FilePondPluginImageCrop
);

export default {
    name: "UploadPictures",
    components: {
        FooterFooter,
        NavbarNavbar,
        FilePond,
    },
    data() {
        return {
            server: {
                process: {
                    url: axios.defaults.baseURL + '/files/image/upload',
                    method: 'POST',
                    withCredentials: false,
                    headers: {},
                    timeout: 7000,
                    onload: (response) => JSON.parse(response).uuid,
                    onerror: (response) => response.data,
                    ondata: (formData) => {
                        formData.append('token', localStorage.getItem('token'));
                        return formData;
                    },
                },
                revert: (uniqueFileId, load, error) => {
                    axios.request({
                        url: `/files/image/revert/${uniqueFileId}`,
                        method: 'DELETE',
                        data: {
                            token: localStorage.getItem('token'),
                        },
                    })
                        .then((response) => {
                            const data = response.data;
                            if (data.error) {
                                error(data.error);
                            } else {
                                load();
                            }
                        })
                        .catch((err) => {
                            error(err.toString());
                        });
                },
            },
        };
    },
}
</script>