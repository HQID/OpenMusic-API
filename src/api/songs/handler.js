class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postSongHandler = async (request, h) => {
    this._validator.validateSongsPayload(request.payload);
    const { title, year, performer, genre, duration, albumId } = request.payload;
    const songId = await this._service.addSong({
      title,
      year,
      performer,
      genre,
      duration,
      albumId,
    });

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  };

  getSongsHandler = async (request) => {
    const { title = '', performer = '' } = request.query;
    const songs = await this._service.getSongs();

    const filteredSongs = songs.filter((song) => {
      const matchTitle = title ? song.title.toLowerCase().includes(title.toLowerCase()) : true;
      const matchPerformer = performer
        ? song.performer.toLowerCase().includes(performer.toLowerCase())
        : true;
      return matchTitle && matchPerformer;
    });

    return {
      status: 'success',
      data: {
        songs: filteredSongs,
      },
    };
  };

  getSongByIdHandler = async (request, h) => {
    const { id } = request.params;
    const song = await this._service.getSongById(id);
    return {
      status: 'success',
      data: {
        song,
      },
    };
  };

  putSongByIdHandler = async (request, h) => {
    this._validator.validateSongsPayload(request.payload);
    const { id } = request.params;

    await this._service.editSongById(id, request.payload);

    return {
      status: 'success',
      message: 'Lagu berhasil diperbarui',
    };
  };

  deleteSongByIdHandler = async (request, h) => {
    const { id } = request.params;
    await this._service.deleteSongById(id);
    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  };
}

module.exports = SongsHandler;
