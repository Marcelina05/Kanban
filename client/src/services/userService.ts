import pb from 'database/database'

export const getUsername = (): string => {
  return pb.authStore.model?.username ?? ''
}

export const getAvatarUrl = (): string => {
  return pb.getFileUrl(pb.authStore.model!, pb.authStore.model?.avatar) ?? ''
}

export const getUserId = (): string => {
  return pb.authStore.model?.id ?? ''
}
