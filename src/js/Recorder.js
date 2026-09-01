class Recorder {
    constructor() {
        this.stream = null;        
        this.mediaRecorder = null; 
        this.chunks = [];          
        this.src = null;           
        this.mode = null;
    }

    
    async start(mode) {
        try {
            this.stream = null;        
            this.mediaRecorder = null; 
            this.mode = mode;
            this.chunks = [];
            this.src = null;
            
            await this.getPermission();
            
            this.initRecord();
           
            this.recordingPromise = this.waitForStop();

           return this.stream          

        } catch (err) {
            console.error("Ошибка в жизненном цикле записи:", err);
            return;
        }
    }
     

    
    async getPermission() {
        try {
        this.stream = await navigator.mediaDevices.getUserMedia({
            video: (this.mode === 'video'),
            audio: true
        });
    } catch (error) {
        
        throw Error(`Доступ к медиа отклонен: ${error.name}`);
        
         return;
    }
    }

    
    initRecord() {
        this.mediaRecorder = new MediaRecorder(this.stream);

        this.mediaRecorder.addEventListener("error", (event) => {
        console.error("Критическая ошибка записи браузера:", event.error);
    });
    
        this.mediaRecorder.addEventListener("stop", () => {
        console.log("Запись была кем-то остановлена! Текущий статус:", this.mediaRecorder.state);
    });

        this.mediaRecorder.addEventListener("dataavailable", (event) => {
            if (event.data && event.data.size > 0) {
                this.chunks.push(event.data);            
            }
        });

        this.mediaRecorder.start();
    }

    
    waitForStop() {
        return new Promise((resolve) => {           
            this.mediaRecorder.addEventListener("stop", () => {
                const type = this.mode === 'video' ? 'video/webm' : 'audio/webm';
                const blob = new Blob(this.chunks, { type: type });
                this.src = URL.createObjectURL(blob);

                
                resolve(this.src);
            }, { once: true });
        });
    }

    
    clearStream() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
    }

    
    stop() {
        if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
            this.mediaRecorder.stop(); 
        }
    }

    async getRecordData() {        
        if (!this.recordingPromise) return null;
        
        const data = await this.recordingPromise;
        
        this.recordingPromise = null;         

        return {content:data, type: this.mode};
    }
}

export default new Recorder()

