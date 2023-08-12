export class ServersService {
  private servers = [
    {
      id: 1,
      name: 'Productionserver',
      status: 'online',
      allowEdit: '0',
    },
    {
      id: 2,
      name: 'Testserver',
      status: 'offline',
      allowEdit: '0',
    },
    {
      id: 3,
      name: 'Devserver',
      status: 'offline',
      allowEdit: '1',
    },
  ];

  getServers() {
    return this.servers;
  }

  getServer(id: number) {
    const server = this.servers.find((s) => {
      return s.id === id;
    });
    return server;
  }

  updateServer(id: number, serverInfo: { name: string; status: string }) {
    const server = this.servers.find((s) => {
      return s.id === id;
    });
    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
  }
}
