const TicketList = require("./ticket-list");


class Sockets {

    constructor(io) {

        this.io = io;

        // crear instanc TicketList
        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {

            console.log('cliente connectado');

            socket.on('solicitar-ticket', (_, callback) => {
                const nuevoTicket = this.ticketList.crearTicket();
                callback(nuevoTicket);

            });

            socket.on('siguiente-ticket-trabajar', ({ agente, escritorio }, callback) => {

                const suTicket = this.ticketList.asignarTicket(agente, escritorio);
                callback(suTicket);

                this.io.emit('ticket-asignado', this.ticketList.ultimos13);
            });


        });
    }


}


module.exports = Sockets;