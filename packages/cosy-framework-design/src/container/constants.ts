export enum LifecycleEnum {
    /**
     * 每次解析都创建新实例
     */
    TRANSIENT = 'transient',

    /**
     * 在容器中只有一个实例
     */
    SINGLETON = 'singleton',

    /**
     * 在特定作用域内共享实例
     */
    SCOPED = 'scoped'
}