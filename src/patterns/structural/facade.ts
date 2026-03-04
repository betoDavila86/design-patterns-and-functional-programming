/**
 * ============================================================================
 * FACADE PATTERN
 * ============================================================================
 *
 * CATEGORY: Structural Pattern
 *
 * PROBLEM:
 * - Complex subsystem with many interdependent classes
 * - Clients need to understand and coordinate multiple objects
 * - Tight coupling between clients and subsystem implementation
 *
 * SOLUTION:
 * - Create a facade class with a simple interface
 * - Facade coordinates the subsystem components internally
 * - Clients use only the facade for common operations
 *
 * USE CASES:
 * - Simplifying complex libraries or APIs
 * - Providing unified interface to microservices
 * ============================================================================
 */

export interface Codec {
    type: string;
    decode(data: string): string;
    encode(data: string): string;
}

// Subsystem classes - complex video conversion components
export class VideoFile {
    constructor(
        public filename: string,
        public format: string = ''
    ) {
        if (!format) {
            this.format = filename.split('.').pop() ?? 'mp4';
        }
    }
}

export class CodecFactory {
    static extract(file: VideoFile): Codec {
        const type = file.format.toLowerCase();
        console.log(`  📼 Extracting ${type.toUpperCase()} codec from ${file.filename}`);

        if (type === 'mp4') {
            return new MPEG4Codec();
        } else if (type === 'ogg') {
            return new OggCodec();
        }
        return new MPEG4Codec();
    }
}

export class MPEG4Codec implements Codec {
    type = 'mp4';

    decode(data: string): string {
        console.log('  🔄 Decoding MPEG4 data...');
        return `[decoded-mp4]${data}`;
    }

    encode(data: string): string {
        console.log('  🔄 Encoding to MPEG4...');
        return `[encoded-mp4]${data}`;
    }
}

export class OggCodec implements Codec {
    type = 'ogg';

    decode(data: string): string {
        console.log('  🔄 Decoding OGG data...');
        return `[decoded-ogg]${data}`;
    }

    encode(data: string): string {
        console.log('  🔄 Encoding to OGG...');
        return `[encoded-ogg]${data}`;
    }
}

export class BitrateReader {
    static read(file: VideoFile, _codec: Codec): string {
        console.log(`  📊 Reading bitrate from ${file.filename}...`);
        return `bitrate-data:${file.filename}`;
    }

    static convert(buffer: string, _codec: Codec): string {
        console.log('  📊 Converting bitrate...');
        return `[converted]${buffer}`;
    }
}

export class AudioMixer {
    fix(result: string): string {
        console.log('  🔊 Fixing audio levels...');
        return `[audio-fixed]${result}`;
    }
}

// Facade - provides simple interface
export class VideoConverter {
    convert(filename: string, targetFormat: string): string {
        console.log(`\n  Starting conversion: ${filename} → ${targetFormat}`);
        console.log('  ' + '─'.repeat(45));

        const file = new VideoFile(filename);
        const sourceCodec = CodecFactory.extract(file);

        let destinationCodec: Codec;
        if (targetFormat === 'mp4') destinationCodec = new MPEG4Codec();
        else destinationCodec = new OggCodec();

        const buffer = BitrateReader.read(file, sourceCodec);
        let result = BitrateReader.convert(buffer, destinationCodec);

        result = new AudioMixer().fix(result);
        result = destinationCodec.encode(result);

        const outputFile = filename.replace(/\.[^/.]+$/, `.${targetFormat}`);
        console.log('  ' + '─'.repeat(45));
        console.log(`  ✅ Conversion complete: ${outputFile}`);

        return outputFile;
    }
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

export function demonstrateFacade(): void {
    // Without facade, client would need to:
    // 1. Create VideoFile
    // 2. Extract codec using CodecFactory
    // 3. Create destination codec
    // 4. Read bitrate
    // 5. Convert bitrate
    // 6. Fix audio
    // 7. Encode result

    // With facade:
    const converter = new VideoConverter();

    console.log('Converting video files using the Facade:');
    converter.convert('vacation.ogg', 'mp4');
    converter.convert('presentation.mp4', 'ogg');
}
