export const Colors = ['primary', 'secondary', 'warning', "info"]

export const randomColor = () => {
  return Colors[Math.floor(Math.random() * Colors.length)]
}