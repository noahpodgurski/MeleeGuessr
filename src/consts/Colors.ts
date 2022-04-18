export const Colors = ['primary', 'secondary', 'warning', "info"]

export const randomColor = () => {
  return Colors[Math.round(Math.random() * Colors.length)]
}