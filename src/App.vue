<script setup lang="ts">
import {ref, onMounted} from 'vue'
import FormInput from "./components/FormInput.vue";
import MyButton from "./components/MyButton.vue";
import MyError from "./components/MyError.vue";
const message = ref<string>('')
const downloadUrl = ref<string>('')
const filename = ref<string>('')
const isLoading = ref<boolean>(false);
const error = ref<string>('')
const formData = ref({link: '', filename: '', message: ''})
const shareLink = ref('')
const isCopied = ref<boolean>(false);


function handleDownload() {
  if (downloadUrl.value?.length == 0) {
    error.value = 'no download link'
    return
  }
  isLoading.value = true
  error.value = ''
  const a = document.createElement('a')
  a.href = downloadUrl.value || ''
  a.download = filename.value
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const url = urlParams.get('url')
  const msg = urlParams.get('message')
  const name = urlParams.get('filename')
  if (url && url.length > 0) {
    downloadUrl.value = url
    message.value = msg || ''
    filename.value = name || downloadUrl.value.split('/').pop()||''
  }
})

function generateShareLink() {
  if (!formData.value.link) {
    error.value = '缺少下载链接'
    return
  }
  const currentUrl = new URL(window.location.href)
  const baseUrl = `${currentUrl.protocol}//${currentUrl.host}${currentUrl.pathname}`
  const params = new URLSearchParams()
  params.append('url', formData.value.link)
  if (formData.value.filename) {
    params.append('filename', formData.value.filename)
  }
  if (formData.value.message) {
    params.append('message', formData.value.message)

  }
  shareLink.value = `${baseUrl}?${params.toString()}`
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(shareLink.value)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (e) {
    error.value = '复制失败，请手动复制'
  }
}
</script>


<template>
  <div class=" min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
    <div v-if="downloadUrl" class="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
      <div v-if="downloadUrl" class="mb-6">
        <FormInput v-model="downloadUrl" label="下载链接" :disabled="true"></FormInput>
      </div>
      <div v-if="filename" class="mb-6">
        <FormInput v-model="filename" label="文件名" :disabled="true"></FormInput>
      </div>
      <div v-if="message" class="mb-6">
        <FormInput v-model="message" label="备注" :disabled="true"></FormInput>
      </div>
      <MyError  v-if="error" message="error"></MyError>
      <MyButton content="下载" @click="handleDownload">
      </MyButton>

    </div>
    <div v-else class="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">生成分享链接</h1>
      <MyError  v-if="error" :message="error"></MyError>
      <div class="space-y-4">
        <FormInput v-model="formData.link" label="文件链接" placeholder="请输入文件链接"></FormInput>
        <FormInput v-model="formData.filename" label="文件名(可选)" placeholder="请输入文件名"></FormInput>
        <FormInput v-model="formData.message" label="备注(可选)" placeholder="请输入备注"></FormInput>
        <MyButton content="生成链接" @click="generateShareLink">
        </MyButton>
      </div>
      <div v-if="shareLink" class="mt-6">
        <div class="flex items-center space-x-2">
          <input :value="shareLink" readonly
                 class="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"></input>
          <MyButton :notFullWidth="true" @click="copyLink" :content="isCopied ? '已复制' : '复制'"></MyButton>

        </div>
      </div>
    </div>
  </div>

</template>

<style scoped></style>
