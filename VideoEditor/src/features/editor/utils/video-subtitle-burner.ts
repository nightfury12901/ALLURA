export interface Subtitle {
  id: string;
  start: number;
  end: number;
  text: string;
}

export interface SubtitleStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  color: string;
  backgroundColor: string;
  backgroundOpacity: number;
  borderColor: string;
  borderWidth: number;
  position: 'bottom' | 'top' | 'center';
  alignment: 'left' | 'center' | 'right';
  padding: number;
}

export class VideoSubtitleBurner {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private video: HTMLVideoElement;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.video = document.createElement('video');
  }

  async burnSubtitlesIntoVideo(
    videoFile: File, 
    subtitles: Subtitle[],
    style: SubtitleStyle,
    onProgress?: (progress: number) => void
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      this.video.crossOrigin = 'anonymous';
      
      this.video.onloadedmetadata = () => {
        this.setupCanvas();
        this.startRecording(subtitles, style, onProgress, resolve, reject);
      };

      this.video.onerror = () => reject(new Error('Failed to load video'));
      this.video.src = URL.createObjectURL(videoFile);
    });
  }

  private setupCanvas() {
    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;
    
    // Set high DPI for better quality
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = this.canvas.width;
    const displayHeight = this.canvas.height;
    
    this.canvas.width = displayWidth * dpr;
    this.canvas.height = displayHeight * dpr;
    this.canvas.style.width = displayWidth + 'px';
    this.canvas.style.height = displayHeight + 'px';
    
    this.ctx.scale(dpr, dpr);
  }

  private startRecording(
    subtitles: Subtitle[],
    style: SubtitleStyle,
    onProgress?: (progress: number) => void,
    resolve?: (blob: Blob) => void,
    reject?: (error: Error) => void
  ) {
    const chunks: BlobPart[] = [];
    const stream = this.canvas.captureStream(30); // 30 FPS
    
    const recorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 2500000 // 2.5 Mbps for good quality
    });

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = () => {
      const videoBlob = new Blob(chunks, { type: 'video/webm' });
      resolve?.(videoBlob);
    };

    recorder.onerror = () => {
      reject?.(new Error('Recording failed'));
    };

    // Start recording
    recorder.start();
    
    const duration = this.video.duration;
    let lastTime = -1;

    const drawFrame = () => {
      if (this.video.ended || this.video.paused) {
        recorder.stop();
        return;
      }

      const currentTime = this.video.currentTime;
      
      // Only redraw if time changed (optimization)
      if (currentTime !== lastTime) {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width / (window.devicePixelRatio || 1), this.canvas.height / (window.devicePixelRatio || 1));
        
        // Draw video frame
        this.ctx.drawImage(
          this.video, 
          0, 0, 
          this.canvas.width / (window.devicePixelRatio || 1), 
          this.canvas.height / (window.devicePixelRatio || 1)
        );

        // Find and draw current subtitle
        const currentSubtitle = subtitles.find(
          sub => currentTime >= sub.start && currentTime <= sub.end
        );

        if (currentSubtitle) {
          this.drawSubtitle(currentSubtitle.text, style);
        }

        // Update progress
        if (onProgress && duration > 0) {
          onProgress((currentTime / duration) * 100);
        }

        lastTime = currentTime;
      }

      requestAnimationFrame(drawFrame);
    };

    // Start playback and drawing
    this.video.play().then(() => {
      drawFrame();
    }).catch(err => reject?.(new Error(`Playback failed: ${err.message}`)));
  }

  private drawSubtitle(text: string, style: SubtitleStyle) {
    const canvasWidth = this.canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = this.canvas.height / (window.devicePixelRatio || 1);
    
    // Set font
    this.ctx.font = `${style.fontWeight} ${style.fontSize}px ${style.fontFamily}`;
    this.ctx.textAlign = style.alignment;
    this.ctx.textBaseline = 'middle';

    // Word wrap for long text
    const lines = this.wrapText(text, canvasWidth - (style.padding * 2));
    const lineHeight = style.fontSize * 1.2;
    const totalHeight = lines.length * lineHeight;

    // Calculate position
    let y: number;
    switch (style.position) {
      case 'top':
        y = style.padding + (totalHeight / 2);
        break;
      case 'center':
        y = canvasHeight / 2;
        break;
      case 'bottom':
      default:
        y = canvasHeight - style.padding - (totalHeight / 2);
        break;
    }

    let x: number;
    switch (style.alignment) {
      case 'left':
        x = style.padding;
        break;
      case 'right':
        x = canvasWidth - style.padding;
        break;
      case 'center':
      default:
        x = canvasWidth / 2;
        break;
    }

    // Draw each line
    lines.forEach((line, index) => {
      const lineY = y + (index - (lines.length - 1) / 2) * lineHeight;
      
      // Draw background if specified
      if (style.backgroundColor && style.backgroundColor !== 'transparent') {
        const textMetrics = this.ctx.measureText(line);
        const textWidth = textMetrics.width;
        const bgHeight = lineHeight;
        
        let bgX = x;
        if (style.alignment === 'center') bgX = x - textWidth / 2;
        if (style.alignment === 'right') bgX = x - textWidth;
        
        this.ctx.fillStyle = this.hexToRgba(style.backgroundColor, style.backgroundOpacity);
        this.ctx.fillRect(
          bgX - style.padding/2,
          lineY - bgHeight/2,
          textWidth + style.padding,
          bgHeight
        );
      }

      // Draw stroke/outline
      if (style.borderWidth > 0) {
        this.ctx.strokeStyle = style.borderColor;
        this.ctx.lineWidth = style.borderWidth;
        this.ctx.lineJoin = 'round';
        this.ctx.miterLimit = 2;
        this.ctx.strokeText(line, x, lineY);
      }

      // Draw text
      this.ctx.fillStyle = style.color;
      this.ctx.fillText(line, x, lineY);
    });
  }

  private wrapText(text: string, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach(word => {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = this.ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    
    if (currentLine) {
      lines.push(currentLine);
    }

    return lines.length > 0 ? lines : [text];
  }

  private hexToRgba(hex: string, alpha: number): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return hex;
  }

  cleanup() {
    if (this.video.src) {
      URL.revokeObjectURL(this.video.src);
    }
  }
}
