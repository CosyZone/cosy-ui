/**
 * 文件上传接口
 * 
 * 定义了上传文件的元数据和属性。这个接口通常用于处理通过 multipart/form-data 
 * 方式上传的文件。
 * 
 * @example
 * ```typescript
 * // 处理单个文件上传
 * app.post('/upload', async (req, res) => {
 *   const file: FileUpload = req.file('avatar');
 *   console.log(`接收到文件: ${file.originalname}`);
 *   console.log(`保存为: ${file.filename}`);
 *   console.log(`大小: ${file.size} bytes`);
 *   console.log(`类型: ${file.mimetype}`);
 * });
 * 
 * // 处理多个文件上传
 * app.post('/upload-many', async (req, res) => {
 *   const files: FileUpload[] = req.file('photos');
 *   for (const file of files) {
 *     await processUploadedFile(file);
 *   }
 * });
 * ```
 * 
 * @remarks
 * 文件上传处理的最佳实践：
 * 1. 始终验证文件类型和大小
 * 2. 使用安全的文件名生成方式
 * 3. 适当处理文件存储路径
 * 4. 考虑文件处理的异步性质
 */
export interface FileUpload {
    /**
     * 表单字段名
     * 例如：<input type="file" name="avatar" />中的 "avatar"
     */
    fieldname: string;

    /**
     * 上传文件的原始名称
     * 包含文件扩展名，例如："profile-picture.jpg"
     */
    originalname: string;

    /**
     * 文件编码类型
     */
    encoding: string;

    /**
     * 文件的 MIME 类型
     * 例如："image/jpeg", "application/pdf"
     */
    mimetype: string;

    /**
     * 文件大小（字节）
     */
    size: number;

    /**
     * 文件保存的目标目录
     * 可选字段，取决于存储策略
     */
    destination?: string;

    /**
     * 服务器上保存的文件名
     * 通常是经过处理的安全文件名
     */
    filename: string;

    /**
     * 文件的完整路径
     * 包含目标目录和文件名
     */
    path: string;
} 
