export class AudioProcessor {
  private audioContext: AudioContext | null = null;

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  // Extract audio from video
  async extractAudioFromVideo(videoFile: File): Promise<{ audioBlob: Blob; duration: number }> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      video.onloadedmetadata = () => {
        const duration = video.duration;
        
        // Create audio context for extraction
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioCtx.createMediaElementSource(video);
        const dest = audioCtx.createMediaStreamDestination();
        source.connect(dest);
        
        // Record audio
        const mediaRecorder = new MediaRecorder(dest.stream);
        const audioChunks: BlobPart[] = [];
        
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          resolve({ audioBlob, duration });
        };
        
        // Start recording and play video
        mediaRecorder.start();
        video.play();
        
        video.onended = () => {
          mediaRecorder.stop();
        };
      };
      
      video.onerror = () => reject(new Error('Failed to load video'));
      video.src = URL.createObjectURL(videoFile);
    });
  }

  // AssemblyAI - Much better than Web Speech API
  async transcribeWithAssemblyAI(audioBlob: Blob, apiKey: string): Promise<any> {
    try {
      // Step 1: Upload audio file
      const uploadFormData = new FormData();
      uploadFormData.append('audio', audioBlob);
      
      const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: {
          'Authorization': apiKey,
        },
        body: uploadFormData,
      });
      
      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.statusText}`);
      }
      
      const { upload_url } = await uploadResponse.json();
      
      // Step 2: Request transcription
      const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
        method: 'POST',
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audio_url: upload_url,
          punctuate: true,
          format_text: true,
          dual_channel: false,
          word_timestamps: true,
          speaker_labels: false,
        }),
      });
      
      const transcript = await transcriptResponse.json();
      const transcriptId = transcript.id;
      
      // Step 3: Poll for completion
      let result;
      do {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        
        const pollingResponse = await fetch(
          `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
          {
            method: 'GET',
            headers: {
              'Authorization': apiKey,
            },
          }
        );
        
        result = await pollingResponse.json();
      } while (result.status === 'processing' || result.status === 'queued');
      
      if (result.status === 'error') {
        throw new Error(`Transcription failed: ${result.error}`);
      }
      
      return result;
      
    } catch (error) {
      console.error('AssemblyAI Error:', error);
      throw error;
    }
  }

  // Fallback: Use Deepgram (another good alternative)
  async transcribeWithDeepgram(audioBlob: Blob, apiKey: string): Promise<any> {
    try {
      const response = await fetch(
        'https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&punctuate=true&diarize=false',
        {
          method: 'POST',
          headers: {
            'Authorization': `Token ${apiKey}`,
            'Content-Type': 'audio/wav',
          },
          body: audioBlob,
        }
      );

      if (!response.ok) {
        throw new Error(`Deepgram API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Deepgram Error:', error);
      throw error;
    }
  }

  // Simple local solution using MediaRecorder (no external API needed)
  async transcribeWithLocalProcessing(audioBlob: Blob): Promise<any> {
    // This is a simplified approach - in real implementation you'd need
    // to integrate with a local ML model or use browser-based solution
    
    return new Promise((resolve) => {
      // Simulate processing time
      setTimeout(() => {
        // Mock transcription - in real implementation this would be processed locally
        const mockTranscript = {
          text: "This is a locally processed transcript placeholder. In production, you would integrate with a local speech-to-text model.",
          words: [
            { word: "This", start: 0.0, end: 0.5, confidence: 0.9 },
            { word: "is", start: 0.5, end: 0.7, confidence: 0.95 },
            { word: "a", start: 0.7, end: 0.8, confidence: 0.9 },
            { word: "locally", start: 0.8, end: 1.3, confidence: 0.85 },
            { word: "processed", start: 1.3, end: 1.8, confidence: 0.9 },
            { word: "transcript", start: 1.8, end: 2.5, confidence: 0.88 }
          ]
        };
        resolve(mockTranscript);
      }, 3000);
    });
  }
}

// Video processor for burning subtitles
export class VideoProcessor {
  // Burn subtitles directly into video using Canvas API
  async burnSubtitlesIntoVideo(
    videoFile: File, 
    subtitles: Array<{start: number; end: number; text: string}>,
    style: any
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas not supported'));
        return;
      }

      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const chunks: BlobPart[] = [];
        const stream = canvas.captureStream(30); // 30 FPS
        const recorder = new MediaRecorder(stream, {
          mimeType: 'video/webm;codecs=vp9'
        });
        
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };
        
        recorder.onstop = () => {
          const videoBlob = new Blob(chunks, { type: 'video/webm' });
          resolve(videoBlob);
        };
        
        // Start recording
        recorder.start();
        
        const drawFrame = () => {
          if (video.ended) {
            recorder.stop();
            return;
          }
          
          // Draw video frame
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Find current subtitle
          const currentTime = video.currentTime;
          const currentSubtitle = subtitles.find(
            sub => currentTime >= sub.start && currentTime <= sub.end
          );
          
          // Draw subtitle if present
          if (currentSubtitle) {
            this.drawSubtitle(ctx, currentSubtitle.text, canvas.width, canvas.height, style);
          }
          
          requestAnimationFrame(drawFrame);
        };
        
        video.onplay = () => {
          drawFrame();
        };
        
        video.play();
      };
      
      video.onerror = () => reject(new Error('Video loading failed'));
      video.src = URL.createObjectURL(videoFile);
    });
  }
  
  private drawSubtitle(
    ctx: CanvasRenderingContext2D, 
    text: string, 
    canvasWidth: number, 
    canvasHeight: number, 
    style: any
  ) {
    // Set text style
    ctx.font = `${style.fontWeight} ${style.fontSize}px ${style.fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    
    // Calculate position
    let y = canvasHeight - 50; // Bottom position
    if (style.position === 'top') y = 100;
    if (style.position === 'center') y = canvasHeight / 2;
    
    const x = canvasWidth / 2;
    
    // Draw background if specified
    if (style.backgroundColor && style.backgroundColor !== 'transparent') {
      const textMetrics = ctx.measureText(text);
      const textWidth = textMetrics.width;
      const textHeight = style.fontSize;
      
      ctx.fillStyle = style.backgroundColor;
      ctx.globalAlpha = style.backgroundOpacity || 0.8;
      ctx.fillRect(
        x - textWidth/2 - 20, 
        y - textHeight - 10, 
        textWidth + 40, 
        textHeight + 20
      );
      ctx.globalAlpha = 1;
    }
    
    // Draw stroke/outline
    if (style.borderWidth > 0) {
      ctx.strokeStyle = style.borderColor;
      ctx.lineWidth = style.borderWidth;
      ctx.strokeText(text, x, y);
    }
    
    // Draw text
    ctx.fillStyle = style.color;
    ctx.fillText(text, x, y);
  }
}
