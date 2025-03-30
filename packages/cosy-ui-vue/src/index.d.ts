import type { App, Component } from 'vue'

export const Button: Component

export interface CosyInstance {
  install: (app: App) => void
}

declare const _default: CosyInstance
export default _default
