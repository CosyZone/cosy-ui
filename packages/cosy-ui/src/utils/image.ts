/**
 * 图片工具函数
 * 提供多种图片服务选项，用于生成示例图片
 */

export type ImageProvider = 'picsum' | 'unsplash' | 'placeholder' | 'robohash';

export interface ImageOptions {
    width: number;
    height: number;
    tag?: string;
    randomSeed?: number | string;
    provider?: ImageProvider;
    grayscale?: boolean;
    blur?: number;
}

/**
 * 获取示例图片URL
 * @param options 图片选项配置
 * @returns 生成的图片URL
 *
 * @example
 * // 基本用法
 * getExampleImage({ width: 400, height: 300 })
 *
 * @example
 * // 使用Unsplash并添加标签
 * getExampleImage({
 *   width: 400,
 *   height: 300,
 *   provider: 'unsplash',
 *   tag: 'nature'
 * })
 */
export function getExampleImage(options: ImageOptions): string {
    const {
        width,
        height,
        provider = 'robohash',
        tag = '',
        randomSeed = Math.floor(Math.random() * 1000),
        grayscale = false,
        blur = 0,
    } = options;

    switch (provider) {
        case 'picsum': {
            const picsumParams = [];
            if (grayscale) picsumParams.push('grayscale');
            if (blur > 0 && blur <= 10) picsumParams.push(`blur=${blur}`);

            const picsumQuery = picsumParams.length
                ? `?${picsumParams.join('&')}`
                : `?random=${randomSeed}`;

            return `https://picsum.photos/${width}/${height}${picsumQuery}`;
        }

        case 'unsplash': {
            const tagQuery = tag ? `?${tag}` : '';
            return `https://source.unsplash.com/random/${width}x${height}${tagQuery}`;
        }

        case 'placeholder': {
            const color = grayscale ? 'gray' : '';
            const placeholderParams = [];
            if (tag) placeholderParams.push(`text=${encodeURIComponent(tag)}`);
            if (color) placeholderParams.push(`bg=${color}`);

            const placeholderQuery = placeholderParams.length
                ? `?${placeholderParams.join('&')}`
                : '';

            return `https://via.placeholder.com/${width}x${height}${placeholderQuery}`;
        }

        case 'robohash': {
            const seed = String(tag || randomSeed);
            return `https://robohash.org/${encodeURIComponent(seed)}?size=${width}x${height}`;
        }

        default: {
            return `https://picsum.photos/${width}/${height}?random=${randomSeed}`;
        }
    }
}

/**
 * 获取产品示例图片
 * @param options 可选的图片选项配置
 */
export function getProductImage(options: Partial<ImageOptions> = {}): string {
    return getExampleImage({
        width: options.width || 400,
        height: options.height || 300,
        provider: options.provider || 'picsum',
        tag: options.tag || 'product',
        ...options,
    });
}

/**
 * 获取头像示例图片
 * @param options 可选的图片选项配置
 */
export function getAvatarImage(options: Partial<ImageOptions> = {}): string {
    return getExampleImage({
        width: options.width || 200,
        height: options.height || 200,
        provider: options.provider || 'robohash',
        ...options,
    });
}

/**
 * 获取景观示例图片
 * @param options 可选的图片选项配置
 */
export function getLandscapeImage(options: Partial<ImageOptions> = {}): string {
    return getExampleImage({
        width: options.width || 800,
        height: options.height || 400,
        provider: options.provider || 'unsplash',
        tag: options.tag || 'landscape',
        ...options,
    });
}
