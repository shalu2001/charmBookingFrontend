export const checkURLParam = (param: string | number | null | undefined) => {
  console.log('Checking param:', param)
  if (param === null || param === undefined || param === '' || param === 'null') {
    return false
  }
  return true
}

export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const formattedHour = hour % 12 || 12
  return `${formattedHour}:${minutes} ${ampm}`
}
