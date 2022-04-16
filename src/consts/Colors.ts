export const Colors = ['primary', 'secondary', 'success', 'danger', 'warning', "info"]

export const randomColor = () => {
  return Colors[Math.round(Math.random() * Colors.length)]
}