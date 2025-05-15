type EventCallback = (...args: any[]) => void;

class EventEmitter {
    private events: { [key: string]: EventCallback[] } = {};

    on(event: string, callback: EventCallback): () => void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
        return () => this.off(event, callback);
    }

    off(event: string, callback: EventCallback): void {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(cb => cb !== callback);
    }

    emit(event: string, ...args: any[]): void {
        if (!this.events[event]) return;
        this.events[event].forEach(callback => callback(...args));
    }
}

const WS_BASE_URL = 'wss://payments.pre-bnvo.com/ws/merchant';

export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'reconnecting';

class WebSocketService {
    private static instance: WebSocketService;
    private socket: WebSocket | null = null;
    private eventEmitter: EventEmitter;
    private reconnectAttempts: number = 0;
    private maxReconnectAttempts: number = 5;
    private reconnectTimeout: number = 3000;
    private identifier: string | null = null;
    private status: WebSocketStatus = 'disconnected';
    private shouldReconnect: boolean = true;
    private lastMessage: any = null;

    private constructor() {
        this.eventEmitter = new EventEmitter();
    }

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    public connect(identifier: string): void {
        this.identifier = identifier;
        this.shouldReconnect = true;
        this.connectWebSocket();
    }

    private connectWebSocket(): void {
        if (!this.identifier) return;

        this.status = 'connecting';
        this.emitStatusChange();

        try {
            this.socket = new WebSocket(`${WS_BASE_URL}/${this.identifier}`);

            this.socket.onopen = () => {
                this.status = 'connected';
                this.reconnectAttempts = 0;
                this.emitStatusChange();
                this.eventEmitter.emit('connected');
            };

            this.socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.lastMessage = data;
                    this.eventEmitter.emit('message', data);

                    // Desconectar si el pago fue completado o cancelado
                    if (data.status === "CO" || data.status === "CA") {
                        this.disconnect();
                    }
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                }
            };

            this.socket.onclose = () => {
                this.status = 'disconnected';
                this.emitStatusChange();
                this.handleReconnect();
            };

            this.socket.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.eventEmitter.emit('error', error);
            };
        } catch (error) {
            console.error('Error creating WebSocket:', error);
            this.handleReconnect();
        }
    }

    private handleReconnect(): void {
        if (this.shouldReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.status = 'reconnecting';
            this.emitStatusChange();
            this.reconnectAttempts++;
            
            setTimeout(() => {
                this.connectWebSocket();
            }, this.reconnectTimeout);
        } else {
            this.eventEmitter.emit('maxReconnectAttemptsReached');
        }
    }

    public disconnect(): void {
        this.shouldReconnect = false;
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        this.status = 'disconnected';
        this.emitStatusChange();
    }

    public onMessage(callback: (data: any) => void): () => void {
        this.eventEmitter.on('message', callback);
        return () => this.eventEmitter.off('message', callback);
    }

    public onStatusChange(callback: (status: WebSocketStatus) => void): () => void {
        this.eventEmitter.on('statusChange', callback);
        return () => this.eventEmitter.off('statusChange', callback);
    }

    public onError(callback: (error: any) => void): () => void {
        this.eventEmitter.on('error', callback);
        return () => this.eventEmitter.off('error', callback);
    }

    private emitStatusChange(): void {
        this.eventEmitter.emit('statusChange', this.status);
    }

    public getStatus(): WebSocketStatus {
        return this.status;
    }

    public clearMessage(): void {
        this.lastMessage = null;
        this.eventEmitter.emit('message', null);
    }
}

export const websocketService = WebSocketService.getInstance(); 