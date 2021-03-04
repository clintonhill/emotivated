const IMAGE_FOLDER = process.env.NODE_ENV === 'production' ? '/static' : '/images'

export const mainTheme = {
  accent: '#EDAE49',
  primaryText: '#242325',
  backgroundColor: '#D8E4FF',
  logoPath: `${IMAGE_FOLDER}/emotivated.svg`,
  toggleHex: '1F319',
}

export const darkTheme = {
  accent: '#7e530c',
  primaryText:'#EFE9F4',
  backgroundColor: '#242325',
  logoPath: `${IMAGE_FOLDER}/emotivated.svg`,
  toggleHex: '2600',
}
