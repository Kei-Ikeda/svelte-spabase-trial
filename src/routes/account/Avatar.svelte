<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { supabase } from '$lib/supabaseClient/'

  export let size = 10
  export let url: string | null

  let avatarUrl: string | null = null
  let uploading = false
  let files: FileList

  const dispatch = createEventDispatcher()

  const downloadImage = async (path: string) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)

      if (error) {
        throw error
      }

      const url = URL.createObjectURL(data)
      avatarUrl = url
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message)
      }
    }
  }

  const uploadAvatar = async () => {
    try {
      uploading = true

      if (!files || files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${Math.random()}.${fileExt}`

      let { error } = await supabase.storage.from('avatars').upload(filePath, file)

      if (error) {
        throw error
      }

      url = filePath
      dispatch('upload')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      uploading = false
    }
  }

  // urlがあれば画像をダウンロードする
  // urlが変更されると実行される
  $: if (url) downloadImage(url)
</script>

<div class="flex flex-col gap-y-4">
  {#if avatarUrl} <img src={avatarUrl} alt={avatarUrl ? 'Avatar' : 'No image'} class="avatar image"
  style="height: {size}em; width: {size}em;" /> {:else}
  <div class="avatar no-image" style="height: {size}em; width: {size}em;" />
  {/if}

  <div>
    <label class="text-white bg-blue-500 cursor-pointer rounded py-1 px-2" for="single">
      {uploading ? 'Uploading ...' : 'Upload your profile image'}
    </label>
    <input
      style="visibility: hidden; position:absolute;"
      type="file"
      id="single"
      accept="image/*"
      bind:files
      on:change="{uploadAvatar}"
      disabled="{uploading}"
    />
  </div>
</div>
