export const useUploadImage = async(image: File) => {
  const formData = new FormData()

  formData.append('file', image)
  formData.append('upload_preset', 'axplfcjl')

  const response = await fetch('https://api.cloudinary.com/v1_1/dqtnuqde5/image/upload', {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()

  return data.url as string
}
