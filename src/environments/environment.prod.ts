export const environment = {
  production: true,
  room_api: {
    base_path: 'http://localhost:3000',
    entrypoints: {
      create_room: '/session',
      find_room: '/session/find'
    }
  }
};
