/**
 * ============================================================================
 * PROXY PATTERN
 * ============================================================================
 *
 * CATEGORY: Structural Pattern
 *
 * PROBLEM:
 * - Need to control access to an object
 * - Object creation is expensive and should be deferred
 * - Need to add functionality without modifying the original object
 *
 * SOLUTION:
 * - Create a proxy class with the same interface as the original
 * - Proxy controls access and delegates to the real object
 * - Client works with proxy as if it were the real object
 *
 * PROXY TYPES:
 * - Virtual: Lazy init of expensive objects
 * - Protection: Access control based on permissions
 * - Caching: Caches results from expensive operations
 * - Logging: Adds logging without modifying original
 *
 * USE CASES:
 * - Lazy loading of resources
 * - Access control and auth
 * - Caching responses
 * - Remote service proxies
 * ============================================================================
 */

export interface ImageInfo {
    id: string;
    size: number;
    dimensions: { width: number; height: number };
    loadedAt?: Date;
}

// Service interface
export interface ImageService {
    display(imageId: string): void;
    getInfo(imageId: string): ImageInfo;
}

// Real Service - expensive to create/use
export class HighResolutionImageService implements ImageService {
    private images: Map<string, ImageInfo> = new Map();

    constructor() {
        // Simulate expensive init
        console.log('  ⏳ Initializing High-Resolution Image Service...');
        console.log('  ⏳ Loading image db...');
        console.log('  ✅ Image service ready!');
    }

    display(imageId: string): void {
        console.log(`  🖼️  Rendering high-resolution image: ${imageId}`);
        if (!this.images.has(imageId)) {
            this.loadImage(imageId);
        }
    }

    getInfo(imageId: string): ImageInfo {
        if (!this.images.has(imageId)) {
            this.loadImage(imageId);
        }
        return this.images.get(imageId)!;
    }

    private loadImage(imageId: string): void {
        console.log(`  📥 Loading image data for ${imageId}...`);
        this.images.set(imageId, {
            id: imageId,
            size: Math.floor(Math.random() * 10000) + 1000,
            dimensions: { width: 1920, height: 1080 },
            loadedAt: new Date(),
        });
    }
}

// Virtual Proxy
export class LazyImageProxy implements ImageService {
    private realService: HighResolutionImageService | null = null;

    display(imageId: string): void {
        console.log(`  [Proxy] Display requested for ${imageId}`);
        this.getRealService().display(imageId);
    }

    getInfo(imageId: string): ImageInfo {
        console.log(`  [Proxy] Info requested for ${imageId}`);
        return this.getRealService().getInfo(imageId);
    }

    private getRealService(): HighResolutionImageService {
        if (!this.realService) {
            console.log('  [Proxy] First access - initializing real service...');
            this.realService = new HighResolutionImageService();
        }
        return this.realService;
    }
}

// Caching Proxy
export class CachingImageProxy implements ImageService {
    private cache: Map<string, ImageInfo> = new Map();

    constructor(private realService: ImageService) { }

    display(imageId: string): void {
        this.realService.display(imageId);
    }

    getInfo(imageId: string): ImageInfo {
        if (this.cache.has(imageId)) {
            console.log(`  [Cache] HIT for ${imageId}`);
            return this.cache.get(imageId)!;
        }

        console.log(`  [Cache] MISS for ${imageId}`);
        const info = this.realService.getInfo(imageId);
        this.cache.set(imageId, info);
        return info;
    }

    clearCache(): void {
        this.cache.clear();
        console.log('  [Cache] Cleared');
    }
}

// Protection Proxy - access control
export class AccessControlProxy implements ImageService {
    private allowedUsers: Set<string> = new Set(['admin', 'editor']);
    private currentUser: string;

    constructor(private realService: ImageService, user: string) {
        this.currentUser = user;
    }

    private checkAccess(): boolean {
        const hasAccess = this.allowedUsers.has(this.currentUser);
        if (!hasAccess) {
            console.log(`  ⛔ Access denied for user: ${this.currentUser}`);
        }
        return hasAccess;
    }

    display(imageId: string): void {
        if (this.checkAccess()) {
            console.log(`  [Auth] User ${this.currentUser} accessing image`);
            this.realService.display(imageId);
        }
    }

    getInfo(imageId: string): ImageInfo {
        if (this.checkAccess()) {
            return this.realService.getInfo(imageId);
        }
        throw new Error('Access denied');
    }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

export function demonstrateProxy(): void {
    // 1. Virtual Proxy (Lazy Loading)
    console.log('1. Virtual Proxy (Lazy Loading):');
    console.log('   Creating proxy (no initialization yet)...');
    const lazyProxy = new LazyImageProxy();
    console.log('   Proxy created. Real service NOT initialized.');
    console.log('\n   First access triggers initialization:');
    lazyProxy.display('photo-001');

    // 2. Caching Proxy
    console.log('\n2. Caching Proxy:');
    const realService = new HighResolutionImageService();
    const cachingProxy = new CachingImageProxy(realService);

    console.log('\n   First request (cache miss):');
    cachingProxy.getInfo('photo-002');

    console.log('\n   Second request (cache hit):');
    cachingProxy.getInfo('photo-002');

    // 3. Protection Proxy
    console.log('\n3. Protection Proxy:');
    const adminProxy = new AccessControlProxy(realService, 'admin');
    const guestProxy = new AccessControlProxy(realService, 'guest');

    console.log('\n   Admin accessing image:');
    adminProxy.display('photo-003');

    console.log('\n   Guest trying to access image:');
    guestProxy.display('photo-003');
}
